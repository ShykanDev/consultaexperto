const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function cleanClasses(content) {
  // Merge multiple class="..." attributes, while ignoring :class="..."
  return content.replace(/<[a-z0-9-]+[^>]*>/gi, (tag) => {
    // Match only standard class attributes (preceded by whitespace, not a colon)
    const classRegex = /\sclass="([^"]*)"/gi;
    let match;
    const classes = [];
    let hasMultiple = false;

    // Check how many class attributes we have
    const allMatches = [...tag.matchAll(classRegex)];
    if (allMatches.length <= 1) return tag;

    // Extract all class values
    allMatches.forEach((m) => classes.push(m[1]));

    // Remove all standard class attributes
    let newTag = tag.replace(/\sclass="[^"]*"/gi, "");

    // Merge them
    const mergedClasses = classes.join(" ").trim();

    // Add back a single class attribute at the end of the opening tag (before > or />)
    if (newTag.endsWith("/>")) {
      newTag = newTag.replace(/\s*\/>/, ` class="${mergedClasses}" />`);
    } else {
      newTag = newTag.replace(/\s*>$/, ` class="${mergedClasses}">`);
    }

    return newTag;
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = cleanClasses(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Cleaned: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".git") {
        walkDir(fullPath);
      }
    } else if (file.endsWith(".vue")) {
      processFile(fullPath);
    }
  });
}

console.log("--- Inicia Limpieza de Atributos de Clase (v3) ---");
walkDir(srcDir);
console.log("--- Limpieza Completada ---");
