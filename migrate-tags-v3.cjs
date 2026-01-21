const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

const replacements = [
  // 1. Specific complex components (Heading fixes)
  {
    from: /<ion-card-title([^>]*)>([\s\S]*?)<\/ion-card-title>/g,
    to: '<h2 class="web-card-title text-xl font-bold text-gray-900"$1>$2</h2>',
  },
  {
    from: /<ion-card-subtitle([^>]*)>([\s\S]*?)<\/ion-card-subtitle>/g,
    to: '<h3 class="web-card-subtitle text-sm font-medium text-gray-500"$1>$3</h3>',
  },
  {
    from: /<ion-card-header([^>]*)>([\s\S]*?)<\/ion-card-header>/g,
    to: '<div class="web-card-header p-4 border-b border-gray-50"$1>$2</div>',
  },
  {
    from: /<ion-card-content([^>]*)>([\s\S]*?)<\/ion-card-content>/g,
    to: '<div class="web-card-content p-4"$1>$2</div>',
  },

  // 2. Lifecycle hooks
  { from: /onIonViewDidEnter/g, to: "onMounted" },
  { from: /onIonViewWillEnter/g, to: "onBeforeMount" },
  { from: /onIonViewDidLeave/g, to: "onUnmounted" },
  { from: /onIonViewWillLeave/g, to: "onBeforeUnmount" },

  // 3. Structural components (Page, Content)
  {
    from: /<ion-page([^>]*)>/g,
    to: '<div class="web-page min-h-screen bg-gray-50"$1>',
  },
  { from: /<\/ion-page>/g, to: "</div>" },
  {
    from: /<ion-content([^>]*)>/g,
    to: '<main class="web-content overflow-y-auto"$1>',
  },
  { from: /<\/ion-content>/g, to: "</main>" },

  // 4. Header / Toolbar
  {
    from: /<ion-header([^>]*)>/g,
    to: '<header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm"$1>',
  },
  { from: /<\/ion-header>/g, to: "</header>" },
  {
    from: /<ion-toolbar([^>]*)>/g,
    to: '<nav class="web-toolbar h-16 flex items-center px-4"$1>',
  },
  { from: /<\/ion-toolbar>/g, to: "</nav>" },
  {
    from: /<ion-title([^>]*)>/g,
    to: '<h1 class="web-title text-lg font-bold text-gray-900"$1>',
  },
  { from: /<\/ion-title>/g, to: "</h1>" },
  {
    from: /<ion-buttons([^>]*)>/g,
    to: '<div class="web-buttons flex items-center space-x-2"$1>',
  },
  { from: /<\/ion-buttons>/g, to: "</div>" },

  // 5. Buttons & Links
  {
    from: /<ion-back-button[^>]*><\/ion-back-button>/g,
    to: '<button class="web-back-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" @click="$router.back()"><v-icon name="hi-solid-chevron-left" scale="1.5" /></button>',
  },
  {
    from: /<ion-button([^>]*)>/g,
    to: '<button class="web-btn inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50"$1>',
  },
  { from: /<\/ion-button>/g, to: "</button>" },

  // 6. List / Item
  {
    from: /<ion-list([^>]*)>/g,
    to: '<div class="web-list divide-y divide-gray-100"$1>',
  },
  { from: /<\/ion-list>/g, to: "</div>" },
  {
    from: /<ion-item([^>]*)>/g,
    to: '<div class="web-item flex items-center p-4 bg-white hover:bg-gray-50/50 transition-colors"$1>',
  },
  { from: /<\/ion-item>/g, to: "</div>" },
  { from: /<ion-label([^>]*)>/g, to: '<div class="web-label flex-1"$1>' },
  { from: /<\/ion-label>/g, to: "</div>" },

  // 7. Cards (Base)
  {
    from: /<ion-card([^>]*)>/g,
    to: '<div class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"$1>',
  },
  { from: /<\/ion-card>/g, to: "</div>" },

  // 8. Select & Search
  {
    from: /<ion-select([^>]*)>/g,
    to: '<select class="web-select w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"$1>',
  },
  { from: /<\/ion-select>/g, to: "</select>" },
  {
    from: /<ion-select-option([^>]*)>([\s\S]*?)<\/ion-select-option>/g,
    to: "<option $1>$2</option>",
  },
  {
    from: /<ion-searchbar([^>]*)><\/ion-searchbar>/g,
    to: '<div class="relative w-full"><v-icon name="fa-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input class="web-search-input w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium" $1></div>',
  },

  // 9. Feedback & UI elements
  {
    from: /<ion-loading([^>]*)><\/ion-loading>/g,
    to: '<div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"><div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div></div>',
  },
  {
    from: /<ion-spinner([^>]*)><\/ion-spinner>/g,
    to: '<div class="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" $1></div>',
  },
  { from: /<ion-ripple-effect[^>]*><\/ion-ripple-effect>/g, to: "" },
  { from: /<ion-refresher[^>]*>[\s\S]*?<\/ion-refresher>/g, to: "" },

  // 10. Segments (Native Tabs style)
  {
    from: /<ion-segment([^>]*)>([\s\S]*?)<\/ion-segment>/g,
    to: '<div class="flex p-1 bg-gray-100 rounded-xl"$1>$2</div>',
  },
  {
    from: /<ion-segment-button([^>]*)>([\s\S]*?)<\/ion-segment-button>/g,
    to: '<button class="flex-1 py-2 text-sm font-bold rounded-lg transition-all" $1>$2</button>',
  },

  // Attribute Cleanup
  {
    from: /color="primary"/g,
    to: 'class="bg-blue-600 text-white hover:bg-blue-700"',
  },
  {
    from: /color="danger"/g,
    to: 'class="bg-rose-500 text-white hover:bg-rose-600"',
  },
  { from: /expand="block"/g, to: 'class="w-full"' },
  {
    from: /fill="clear"/g,
    to: 'class="bg-transparent text-blue-600 hover:bg-blue-50"',
  },
  { from: /slot="start"/g, to: 'class="order-first"' },
  { from: /slot="end"/g, to: 'class="order-last"' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  replacements.forEach((r) => {
    content = content.replace(r.from, r.to);
  });

  // Cleanup remaining Ionic tags if they escaped previous regex or were broken
  content = content.replace(/<ion-[a-z0-9-]+([^>]*)>/gi, "<div $1>");
  content = content.replace(/<\/ion-[a-z0-9-]+>/gi, "</div>");

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated (v3): ${filePath}`);
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

console.log("--- Inicia Migración Ionic -> Web (v3) ---");
walkDir(srcDir);
console.log("--- Migración Completada ---");
