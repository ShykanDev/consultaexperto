const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

const replacements = [
  // ion-modal -> div v-if
  {
    from: /<ion-modal[^>]*:is-open="([^"]*)"([^>]*)>/g,
    to: '<div v-if="$1" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"$2>',
  },
  { from: /<\/ion-modal>/g, to: "</div>" },

  // ion-segment -> flex container
  {
    from: /<ion-segment([^>]*)>/g,
    to: '<div class="flex p-1 bg-gray-100 rounded-xl overflow-x-auto"$1>',
  },
  { from: /<\/ion-segment>/g, to: "</div>" },
  {
    from: /<ion-segment-button([^>]*)>/g,
    to: '<button class="flex-1 py-2 px-4 text-sm font-bold rounded-lg transition-all" $1>',
  },
  { from: /<\/ion-segment-button>/g, to: "</button>" },

  // ion-segment-view/content -> div
  { from: /<ion-segment-view([^>]*)>/g, to: '<div class="mt-4"$1>' },
  { from: /<\/ion-segment-view>/g, to: "</div>" },
  { from: /<ion-segment-content([^>]*)>/g, to: '<div v-show="true" $1>' },
  { from: /<\/ion-segment-content>/g, to: "</div>" },

  // ion-searchbar
  {
    from: /<ion-searchbar([^>]*)><\/ion-searchbar>/g,
    to: '<div class="relative w-full my-2"><v-icon name="fa-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100" $1></div>',
  },

  // ion-select
  {
    from: /<ion-select\s+([^>]*?)interface="[^"]*"\s*([^>]*)>/g,
    to: '<select $1 $2 class="w-full p-3 bg-white border border-gray-200 rounded-xl appearance-none">',
  },
  {
    from: /<ion-select([^>]*)>/g,
    to: '<select $1 class="w-full p-3 bg-white border border-gray-200 rounded-xl appearance-none">',
  },
  { from: /<\/ion-select>/g, to: "</select>" },
  { from: /<ion-select-option([^>]*)>/g, to: "<option $1>" },
  { from: /<\/ion-select-option>/g, to: "</option>" },

  // ion-refresher
  {
    from: /<ion-refresher[^>]*>[\s\S]*?<\/ion-refresher>/g,
    to: "<!-- Refresher removed -->",
  },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  replacements.forEach((r) => {
    content = content.replace(r.from, r.to);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Migrated components: ${filePath}`);
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

console.log("--- Inicia Migración de Componentes Restantes ---");
walkDir(srcDir);
console.log("--- Migración Completada ---");
