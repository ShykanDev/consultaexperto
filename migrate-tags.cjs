const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

const replacements = [
  // Lifecycle hooks
  { from: /onIonViewDidEnter/g, to: "onMounted" },
  { from: /onIonViewWillEnter/g, to: "onBeforeMount" },
  { from: /onIonViewDidLeave/g, to: "onUnmounted" },
  { from: /onIonViewWillLeave/g, to: "onBeforeUnmount" },

  // Structural components
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

  // Header / Toolbar
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

  // Back button (handle both closed and unclosed tags)
  {
    from: /<ion-back-button[^>]*><\/ion-back-button>/g,
    to: '<button class="web-back-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" @click="$router.back()"><v-icon name="hi-solid-chevron-left" scale="1.5" /></button>',
  },
  {
    from: /<ion-back-button([^>]*)\/>/g,
    to: '<button class="web-back-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" @click="$router.back()"><v-icon name="hi-solid-chevron-left" scale="1.5" /></button>',
  },

  // List / Item
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

  // Cards
  {
    from: /<ion-card([^>]*)>/g,
    to: '<div class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"$1>',
  },
  { from: /<\/ion-card>/g, to: "</div>" },
  {
    from: /<ion-card-header([^>]*)>/g,
    to: '<div class="web-card-header p-4 border-b border-gray-50"$1>',
  },
  { from: /<\/ion-card-header>/g, to: "</div>" },
  {
    from: /<ion-card-title([^>]*)>/g,
    to: '<h2 class="web-card-title text-xl font-bold text-gray-900"$1>',
  },
  { from: /<\/ion-card-title>/g, to: "</h2>" },
  {
    from: /<ion-card-subtitle([^>]*)>/g,
    to: '<h3 class="web-card-subtitle text-sm font-medium text-gray-500"$1>',
  },
  { from: /<\/ion-card-subtitle>/g, to: "</h3>" },
  {
    from: /<ion-card-content([^>]*)>/g,
    to: '<div class="web-card-content p-4"$1>',
  },
  { from: /<\/ion-card-content>/g, to: "</div>" },

  // Buttons
  {
    from: /<ion-button([^>]*)>/g,
    to: '<button class="web-btn inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50"$1>',
  },
  { from: /<\/ion-button>/g, to: "</button>" },

  // Inputs & Controls
  {
    from: /<ion-input([^>]*)>/g,
    to: '<input class="web-input bg-transparent border-none outline-none flex-1 py-3 px-1 text-gray-700 placeholder-gray-400" $1>',
  },
  { from: /<\/ion-input>/g, to: "" },
  {
    from: /<ion-textarea([^>]*)>/g,
    to: '<textarea class="web-textarea bg-transparent border-none outline-none flex-1 py-3 px-1 text-gray-700 placeholder-gray-400" $1>',
  },
  { from: /<\/ion-textarea>/g, to: "</textarea>" },
  {
    from: /<ion-toggle([^>]*)>/g,
    to: '<input type="checkbox" class="web-toggle form-checkbox h-6 w-11 rounded-full text-blue-600 transition duration-200 ease-in-out cursor-pointer" $1>',
  },
  { from: /<\/ion-toggle>/g, to: "" },
  {
    from: /<ion-checkbox([^>]*)>([\s\S]*?)<\/ion-checkbox>/g,
    to: '<label class="flex items-center gap-2 cursor-pointer">$2<input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" $1></label>',
  },

  // Spinners
  {
    from: /<ion-spinner([^>]*)><\/ion-spinner>/g,
    to: '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" $1></div>',
  },

  // Grids
  {
    from: /<ion-grid([^>]*)>/g,
    to: '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"$1>',
  },
  { from: /<\/ion-grid>/g, to: "</div>" },
  { from: /<ion-row([^>]*)>/g, to: '<div class="grid grid-cols-12 gap-4"$1>' },
  { from: /<\/ion-row>/g, to: "</div>" },
  { from: /<ion-col([^>]*)>/g, to: '<div class="col-span-12"$1>' },
  { from: /<\/ion-col>/g, to: "</div>" },

  // Text components
  { from: /<ion-text([^>]*)>/g, to: '<div class="web-text"$1>' },
  { from: /<\/ion-text>/g, to: "</div>" },
  {
    from: /<ion-avatar([^>]*)>/g,
    to: '<div class="web-avatar overflow-hidden rounded-full"$1>',
  },
  { from: /<\/ion-avatar>/g, to: "</div>" },

  // Attribute Cleanup & Mapping
  {
    from: /color="primary"/g,
    to: 'class="bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"',
  },
  {
    from: /color="secondary"/g,
    to: 'class="bg-sky-500 text-white hover:bg-sky-600"',
  },
  {
    from: /color="success"/g,
    to: 'class="bg-emerald-500 text-white hover:bg-emerald-600"',
  },
  {
    from: /color="danger"/g,
    to: 'class="bg-rose-500 text-white hover:bg-rose-600"',
  },
  { from: /expand="block"/g, to: 'class="w-full"' },
  {
    from: /fill="clear"/g,
    to: 'class="bg-transparent text-blue-600 hover:bg-blue-50/80"',
  },
  {
    from: /fill="outline"/g,
    to: 'class="border-2 border-blue-600 text-blue-600 hover:bg-blue-50/50"',
  },
  { from: /slot="start"/g, to: 'class="order-first"' },
  { from: /slot="end"/g, to: 'class="order-last"' },
  { from: /lines="none"/g, to: "" },
  { from: /class="ion-padding"/g, to: 'class="p-4"' },
  { from: /class="ion-no-border"/g, to: 'class="border-none shadow-none"' },

  // Import Cleanup (Ionic generic)
  { from: /import \{[^}]*\} from '@ionic\/vue';/g, to: "" },
  {
    from: /import \{[^}]*\} from '@ionic\/vue-router';/g,
    to: "import { useRouter, useRoute } from 'vue-router';",
  },

  // Icon cleanup
  {
    from: /<ion-icon([^>]*)><\/ion-icon>/g,
    to: '<ion-icon class="web-icon w-6 h-6 flex-shrink-0" $1></ion-icon>',
  },
  {
    from: /<ion-icon([^>]*)\/>/g,
    to: '<ion-icon class="web-icon w-6 h-6 flex-shrink-0" $1></ion-icon>',
  },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  replacements.forEach((r) => {
    content = content.replace(r.from, r.to);
  });

  // Second pass for imports if the first regex was too specific
  content = content.replace(/import\s+\{[^}]*\}\s+from\s+'@ionic\/vue';?/g, "");

  // Handle Router naming if it was routerIon or similar
  content = content.replace(/routerIon/g, "router");

  // Refactor ToastController calls to vue-toastification style (placeholder)
  // This needs manual import of useToast within components, but let's at least change the calls
  // Search for toastController.create and replace with a simplified call
  // We will need a global utility or define it in each component.

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
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
    } else if (file.endsWith(".vue") || file.endsWith(".ts")) {
      processFile(fullPath);
    }
  });
}

console.log("--- Inicia Migración Ionic -> Web (v2) ---");
walkDir(srcDir);
console.log("--- Migración de Tags Completada ---");
