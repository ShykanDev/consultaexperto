const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixBrokenAttributes(content) {
  // Fix class="...class="..." cases
  return content.replace(
    /(<[a-z0-9-]+[^>]*?)\s+class="([^"]*?)class="([^"]*?)"/gi,
    '$1 class="$2 $3"',
  );
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixBrokenAttributes(content);
  // Also fix the div closed with h2/h3
  content = content.replace(
    /<div([^>]*?)>\s*((?:(?!<\/div>).)*?)\s*<\/h([1-6])>/gs,
    "<h$3$1>$2</h$3>",
  );

  // Fix nested class attributes that merged weirdly
  content = content.replace(
    /class="([^"]*?)"class="([^"]*?)"/gi,
    'class="$1 $2"',
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed attributes: ${filePath}`);
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

console.log("--- Inicia Script de Reparación de Atributos ---");
walkDir(srcDir);
console.log("--- Reparación Completada ---");
