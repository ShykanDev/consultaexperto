const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

const fixes = [
  // Fix garbled tags from greedy ion-card replacement
  { from: /<div\s+-content/g, to: '<div class="web-card-content p-6"' },
  { from: /<div\s+-header/g, to: '<div class="web-card-header p-4 border-b"' },
  {
    from: /<div\s+-title/g,
    to: '<div class="web-card-title px-4 pt-4 pb-2 text-lg font-bold"',
  },
  { from: /"-content/g, to: 'class="web-card-content p-6"' },
  { from: /"-header/g, to: 'class="web-card-header p-4 border-b"' },
  {
    from: /"-title/g,
    to: 'class="web-card-title px-4 pt-4 pb-2 text-lg font-bold"',
  },

  // Fix double class from previous runs if any
  { from: /class="([^"]*)"\s+class="([^"]*)"/g, to: 'class="$1 $2"' },

  // Fix empty attributes or weird symbols left over
  { from: /\s+:\s+class=/g, to: " :class=" },
  { from: /"\s+mode="ios"/g, to: '"' }, // remove mode="ios"
  { from: /"\s+:fullscreen="true"/g, to: '"' }, // remove :fullscreen="true"
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  fixes.forEach((f) => {
    content = content.replace(f.from, f.to);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
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

console.log("--- Inicia Script de Corrección ---");
walkDir(srcDir);
console.log("--- Corrección Completada ---");
