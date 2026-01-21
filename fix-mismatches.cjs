const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixTagMismatches(content) {
  // Fix cases where h2/h3 closes a div
  content = content.replace(
    /<(div|h1|h2|h3|h4|h5|h6)([^>]*?)>\s*((?:(?!<\/h[1-6]>|<\/div>).)*?)\s*<\/h([1-6])>/gs,
    (match, openTag, attrs, inner, closeLevel) => {
      return `<h${closeLevel}${attrs}>${inner}</h${closeLevel}>`;
    },
  );

  // Also fix cases where div closes a heading
  content = content.replace(
    /<(h[1-6])([^>]*?)>\s*((?:(?!<\/h[1-6]>|<\/div>).)*?)\s*<\/div>/gs,
    (match, openTag, attrs, inner) => {
      return `<${openTag}${attrs}>${inner}</${openTag}>`;
    },
  );

  return content;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixTagMismatches(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed tag mismatch: ${filePath}`);
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

console.log("--- Inicia Script de Reparación de Etiquetas Desparejadas ---");
walkDir(srcDir);
console.log("--- Reparación Completada ---");
