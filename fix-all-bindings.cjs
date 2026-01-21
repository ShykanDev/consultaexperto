const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixClassBindings(content) {
  // Pattern 1: :class="static classes { dynamic: object } static classes"
  // We want to extract "static classes" and put them into class=""

  // This regex looks for :class=" ... { ... } ... "
  // It captures everything inside the quotes.
  const classRegex = /:class="([^"]*?\{[\s\S]*?\}[^"]*?)"/g;

  content = content.replace(classRegex, (match, p1) => {
    // p1 is the content of :class="..."
    // e.g. "static-1 { 'text-red': error } static-2"

    // Find the object part
    const objectMatch = p1.match(/\{[\s\S]*?\}/);
    if (!objectMatch) return match;

    const objectPart = objectMatch[0];
    const staticPart = p1.replace(objectPart, "").trim().replace(/\s+/g, " ");

    if (staticPart) {
      // If there's a static part, we return both class and :class
      return `class="${staticPart}" :class="${objectPart}"`;
    }
    return match; // Keep as is if it's just the object
  });

  // Pattern 2: :class="static classes condition ? val1 : val2"
  const ternaryRegex = /:class="([^"]*?\s.*?\s\?.*?:.*?)"/g;
  content = content.replace(ternaryRegex, (match, p1) => {
    // e.g. "px-4 py-2 condition ? 'a' : 'b'"
    // Look for the first part that looks like a ternary
    // Usually it's something before a space followed by a ternary or vice versa.

    const parts = p1.split(/\s+/);
    let staticClasses = [];
    let dynamicPart = [];
    let inDynamic = false;

    // Simple heuristic: find where the ternary starts
    // Ternaries in these files usually look like "condition ? 'val' : 'val'"
    // Or just "isBanned ? 'red' : 'green'"

    // Let's try to find the ternary block.
    // It usually has a ? and a :
    const ternaryMatch = p1.match(/([^\s]+?\s*\?[\s\S]*?:\s*[^\s]+)/);
    if (!ternaryMatch) return match;

    const ternary = ternaryMatch[0];
    const rest = p1.replace(ternary, "").trim().replace(/\s+/g, " ");

    if (rest) {
      return `class="${rest}" :class="${ternary}"`;
    }
    return match;
  });

  // Pattern 3: Invalid attribute nesting like <select ... -option
  content = content.replace(/-option/g, "option");

  // Pattern 4: v-icon name="..." :class="..." where the class is broken
  // (handled by the general class regex above usually)

  // Pattern 5: Double class attributes after previous fixes
  const doubleClassRegex = /class="([^"]*)"\s+class="([^"]*)"/g;
  content = content.replace(doubleClassRegex, 'class="$1 $2"');

  // Pattern 6: Fix unclosed quotes in attributes
  // Sometimes scripts leave things like label="Something
  const unclosedQuoteRegex = /([a-z-]+)="([^"]*?)(\s+[a-z-]+="|$)/gi;
  // This is hard to fix safely. Let's stick to known issues.

  return content;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixClassBindings(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed bindings: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".git") walkDir(fullPath);
    } else if (file.endsWith(".vue")) {
      processFile(fullPath);
    }
  });
}

console.log("--- Inicia Corrección de Bindings de Clase ---");
walkDir(srcDir);
console.log("--- Corrección Completada ---");
