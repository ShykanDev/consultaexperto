const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixGeneralTemplateIssues(content) {
  // 1. Fix mixed class bindings (object style)
  const objectClassRegex = /:class="([^"]*?\{[\s\S]*?\}[^"]*?)"/g;
  content = content.replace(objectClassRegex, (match, p1) => {
    const objectMatch = p1.match(/\{[\s\S]*?\}/);
    if (!objectMatch) return match;
    const objectPart = objectMatch[0];
    const staticPart = p1.replace(objectPart, "").trim().replace(/\s+/g, " ");
    if (staticPart) return `class="${staticPart}" :class="${objectPart}"`;
    return match;
  });

  // 2. Fix mixed class bindings (ternary style)
  const ternaryClassRegex = /:class="([^"\[\{]*?\s.*?\?.*?:.*?)"/g;
  content = content.replace(ternaryClassRegex, (match, p1) => {
    // Look for something like "class1 class2 condition ? 'a' : 'b'"
    const ternaryMatch = p1.match(/([^\s]+?\s*\?[\s\S]*?:\s*[^\s]+)/);
    if (!ternaryMatch) return match;
    const ternary = ternaryMatch[0];
    const rest = p1.replace(ternary, "").trim().replace(/\s+/g, " ");
    if (rest) return `class="${rest}" :class="${ternary}"`;
    return match;
  });

  // 3. Fix "plain text with spaces" in :class (which is invalid JS)
  // e.g. :class="class1 varName class2"
  const plainSpacesRegex = /:class="([^"\[\{]*?\s[^"\[\{]*?)"/g;
  content = content.replace(plainSpacesRegex, (match, p1) => {
    // If it has spaces but NO quotes (except inside ? : which is handled above),
    // it's likely a mix.
    if (p1.includes("?") || p1.includes("[") || p1.includes("{")) return match;

    // Split and try to identify variables vs classes
    const parts = p1.split(/\s+/);
    const classes = [];
    const variables = [];

    parts.forEach((p) => {
      // Heuristic: if it has a hyphen, number, or is a known common tailwind class, it's a class
      if (
        p.includes("-") ||
        /\d/.test(p) ||
        [
          "flex",
          "grid",
          "block",
          "hidden",
          "relative",
          "absolute",
          "static",
          "sticky",
        ].includes(p)
      ) {
        classes.push(p);
      } else if (p) {
        variables.push(p);
      }
    });

    if (classes.length > 0) {
      const classAttr = `class="${classes.join(" ")}"`;
      const bindAttr =
        variables.length > 0 ? `:class="${variables.join(" ")}"` : "";
      return `${classAttr} ${bindAttr}`.trim();
    }
    return match;
  });

  // 4. Fix double nested same tags (e.g. <h2 ...><h2 ...>...</h2></h2>)
  // captured by <(h[1-6]|div)([^>]*)><\1([^>]*)>
  const nestedTags = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "span"];
  nestedTags.forEach((tag) => {
    const regex = new RegExp(`<${tag}([^>]*)>(\\s*)<${tag}([^>]*)>`, "gi");
    content = content.replace(regex, `<${tag}$1 $3>$2`);
    // And remove matching extra closing tag
    const closeRegex = new RegExp(`</${tag}>(\\s*)</${tag}>`, "gi");
    content = content.replace(closeRegex, `</${tag}>$1`);
  });

  // 5. Fix garbage attributes like "-subtitle" or "-option"
  content = content.replace(/\s-subtitle/g, ' class="web-subtitle"');
  content = content.replace(/\s-title/g, ' class="web-title"');
  content = content.replace(/\s-option/g, " option");

  // 6. Fix double class attributes
  content = content.replace(
    /class="([^"]*)"\s+class="([^"]*)"/g,
    'class="$1 $2"',
  );

  // 7. Fix unclosed/mangled v-icon or other components
  content = content.replace(/:icon=([a-zA-Z]+)/g, ':icon="$1"');

  // 8. Fix the specific "isBlocked ? ... ios-expert-avatar-placeholder" issue
  content = content.replace(
    /:class="isBlocked \? 'bg-slate-200' : 'ios-expert-avatar-placeholder' ios-expert-avatar-placeholder"/g,
    ":class=\"isBlocked ? 'bg-slate-200' : 'ios-expert-avatar-placeholder'\" class=\"ios-expert-avatar-placeholder\"",
  );

  return content;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixGeneralTemplateIssues(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Deep cleaning: ${filePath}`);
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

console.log("--- Inicia Limpieza Profunda de Templates ---");
walkDir(srcDir);
console.log("--- Limpieza Completada ---");
