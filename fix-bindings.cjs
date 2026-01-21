const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixBrokenClassBindings(content) {
  // Fix :class="static { reactive }" -> class="static" :class="{ reactive }"
  return content.replace(
    /:class="([^"]*?)(\{.*?\})"/gi,
    (match, staticPart, reactivePart) => {
      const staticClasses = staticPart.trim();
      if (staticClasses) {
        return `class="${staticClasses}" :class="${reactivePart}"`;
      }
      return match; // already correct if no static part
    },
  );
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixBrokenClassBindings(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed class binding: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules") walkDir(fullPath);
    } else if (file.endsWith(".vue")) {
      processFile(fullPath);
    }
  });
}

console.log("--- Inicia Script de Reparación de Bindings de Clase ---");
walkDir(srcDir);
console.log("--- Reparación Completada ---");
