const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function fixTemplateGarbage(content) {
  // Fix select select-option mess
  content = content.replace(
    /<select\s+class="web-select[^"]*"-option/gi,
    "<option",
  );
  content = content.replace(
    /<select\s+[^>]*class="web-select[^"]*"-option/gi,
    "<option",
  );

  // Fix div closed with div but was previously select-option
  // This is tricky. Let's look for "</div>" followed by a closing select tag
  // or a div that was meant to be an option.

  // Fix <h1 class="web-page"> -> <div class="web-page">
  content = content.replace(
    /<h1 class="web-page([^"]*)">/gi,
    '<div class="web-page$1">',
  );
  content = content.replace(/<\/h1>(\s*)<\/template>/gi, "</div>$1</template>");

  // Fix unclosed/mismatched h1/h2/div created by previous scripts
  content = content.replace(
    /<div class="web-title([^"]*)">/gi,
    '<h1 class="web-title$1">',
  );
  content = content.replace(
    /<\/div>(\s*)<\/nav>(\s*)<\/header>/gi,
    "</h1>$1</nav>$2</header>",
  );

  // Fix the "web-icon ... web-icon" double class in attributes
  content = content.replace(/class="web-icon[^"]*web-icon/g, 'class="web-icon');

  return content;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  content = fixTemplateGarbage(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Final Clean: ${filePath}`);
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

console.log("--- Inicia Limpieza Final de Templates ---");
walkDir(srcDir);
console.log("--- Limpieza Completada ---");
