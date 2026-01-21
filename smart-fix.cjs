const fs = require("fs");
const path = require("path");

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    let fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (file.endsWith(".vue")) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
};

const vueFiles = getAllFiles(path.join(__dirname, "src"));

console.log(`--- Smart Fixing ${vueFiles.length} Vue Files ---`);

vueFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let original = content;

  // --- 1. Fix Imports ---
  // Extract script content
  const scriptMatch = content.match(/<script([\s\S]*?)>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    let scriptContent = scriptMatch[2];

    // List of common Vue composables to check
    const vueImports = [
      "onMounted",
      "onUnmounted",
      "onBeforeMount",
      "onBeforeUnmount",
      "ref",
      "reactive",
      "computed",
      "watch",
      "watchEffect",
      "toRefs",
      "nextTick",
    ];

    const needed = [];
    vueImports.forEach((imp) => {
      // distinctive usage check: word boundary, not preceded by 'import {'
      // This is a simple regex, might have false positives in comments strings
      const regex = new RegExp(`\\b${imp}\\b`, "g");
      // Remove imports from check
      const bodyWithoutImports = scriptContent.replace(
        /import\s+{[^}]*}\s+from\s+['"]vue['"]/g,
        "",
      );
      if (regex.test(bodyWithoutImports)) {
        needed.push(imp);
      }
    });

    if (needed.length > 0) {
      // Find existing Vue import
      const vueImportRegex = /import\s+{([^}]*)}\s+from\s+['"]vue['"]/;
      const existingImport = scriptContent.match(vueImportRegex);

      if (existingImport) {
        const existingList = existingImport[1]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const combined = new Set([...existingList, ...needed]);
        const newImportStmt = `import { ${Array.from(combined).join(
          ", ",
        )} } from 'vue'`;
        content = content.replace(vueImportRegex, newImportStmt);
      } else {
        // Add new import at the top of script
        // Try to put it after <script ...>
        // We do a replace on the full file content
        content = content.replace(
          /(<script[^>]*>)/,
          `$1\nimport { ${needed.join(", ")} } from 'vue';`,
        );
      }
    }
  }

  // --- 2. Fix Broken/Mismatched Tags (Heuristics) ---

  // A. <h1 class="web-..."> should usually be <div class="web-...">
  // Many legacy Ionic apps abused h-tags for styling classes
  const classesToConvert = [
    "web-page",
    "web-content",
    "web-buttons",
    "web-list",
    "web-item",
    "web-label",
    "web-input",
    "web-select",
  ];

  classesToConvert.forEach((cls) => {
    // Replace opening tag
    const openRegex = new RegExp(
      `<h[1-6]\\s+class="${cls}([^"]*)"([^>]*)>`,
      "g",
    );
    content = content.replace(openRegex, `<div class="${cls}$1"$2>`);

    // Note: Closing tag replacement is harder because we don't know which </h1> belongs to which.
    // But if we convert ALL specific headed classes to div, we can assume unmatched </h1> might need to be </div>
    // For safety, let's just do a pattern match for the specific structure if it fits on one or nearby lines
  });

  // B. Fix "</h1>" that should be "</div>"
  // Heuristic: If we see </h1> but the nearest preceding opening tag is <div ...> (and not nested), change it.
  // This is hard with regex.
  // Let's do a "dumb" fix for frequent errors detected: </h1> closing a div
  // We can replace lines that contain ONLY </h1> </div> or </h1> with </div> if indentation looks like it matches a div? No.

  // Specific Fix: <h1 class="web-buttons ..."> ... </h1> -> <div ...> ... </div>
  // If the content is short/one-line
  content = content.replace(
    /<h[1-6] class="web-buttons([^"]*)"([^>]*)>([\s\S]*?)<\/h[1-6]>/g,
    '<div class="web-buttons$1"$2>$3</div>',
  );

  // C. Fix invalid </ion-*> tags effectively becoming </div> if the start was replaced
  // Ideally we ran migration scripts, but sometimes stray tags remain.
  // Let's fix specific known debris
  content = content.replace(/<\/ion-label>/g, "</div>");
  content = content.replace(/<\/ion-item>/g, "</div>");
  content = content.replace(/<\/ion-list>/g, "</div>");
  content = content.replace(/<\/ion-content>/g, "</main>"); // web-content usually mapped to main
  content = content.replace(/<\/ion-header>/g, "</header>");
  content = content.replace(/<\/ion-footer>/g, "</footer>");
  content = content.replace(/<\/ion-title>/g, "</h1>"); // or div depending
  content = content.replace(/<\/ion-buttons>/g, "</div>");
  content = content.replace(/<\/ion-button>/g, "</button>");
  content = content.replace(/<\/ion-icon>/g, ""); // close icon self-closing usually, or separate

  // D. Fix <option> ... </div>
  content = content.replace(
    /<option([^>]*)>([\s\S]*?)<\/div>/g,
    "<option$1>$2</option>",
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.basename(file)}`);
  }
});

console.log("Smart Fix script completed.");
