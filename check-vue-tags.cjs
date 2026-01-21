const fs = require("fs");
const path = require("path");

function findVueFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat.isDirectory() &&
      !file.includes("node_modules") &&
      !file.includes(".git")
    ) {
      findVueFiles(filePath, fileList);
    } else if (file.endsWith(".vue")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function checkVueTags(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const issues = [];

  // Stack para rastrear etiquetas abiertas
  const tagStack = [];
  const selfClosingTags = [
    "v-icon",
    "img",
    "input",
    "br",
    "hr",
    "meta",
    "link",
  ];

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Buscar etiquetas de apertura
    const openTags = line.match(/<([a-z-]+)(?:\s|>|\/)/gi);
    if (openTags) {
      openTags.forEach((tag) => {
        const tagName = tag.match(/<([a-z-]+)/i)[1];
        // Ignorar auto-cerradas y comentarios
        if (!selfClosingTags.includes(tagName) && !tag.includes("<!--")) {
          // Verificar si es auto-cerrada con />
          const fullTagMatch = line.match(new RegExp(`<${tagName}[^>]*\\/>`));
          if (!fullTagMatch) {
            tagStack.push({ tag: tagName, line: lineNum });
          }
        }
      });
    }

    // Buscar etiquetas de cierre
    const closeTags = line.match(/<\/([a-z-]+)>/gi);
    if (closeTags) {
      closeTags.forEach((tag) => {
        const tagName = tag.match(/<\/([a-z-]+)>/i)[1];
        const lastOpen = tagStack[tagStack.length - 1];

        if (!lastOpen) {
          issues.push(
            `Línea ${lineNum}: Etiqueta de cierre sin apertura: ${tag}`,
          );
        } else if (lastOpen.tag !== tagName) {
          issues.push(
            `Línea ${lineNum}: Cierre incorrecto. Se esperaba </${lastOpen.tag}> pero se encontró ${tag}`,
          );
        } else {
          tagStack.pop();
        }
      });
    }
  });

  // Verificar etiquetas sin cerrar
  if (tagStack.length > 0) {
    tagStack.forEach((item) => {
      issues.push(`Línea ${item.line}: Etiqueta sin cerrar: <${item.tag}>`);
    });
  }

  return issues;
}

// Buscar todos los archivos .vue
const srcDir = path.join(__dirname, "src");
const vueFiles = findVueFiles(srcDir);

console.log(`Encontrados ${vueFiles.length} archivos .vue\n`);

let totalIssues = 0;
const filesWithIssues = [];

vueFiles.forEach((file) => {
  const issues = checkVueTags(file);
  if (issues.length > 0) {
    totalIssues += issues.length;
    filesWithIssues.push({ file, issues });
  }
});

if (filesWithIssues.length === 0) {
  console.log(
    "✅ No se encontraron problemas de etiquetas en ningún archivo .vue",
  );
} else {
  console.log(
    `❌ Se encontraron ${totalIssues} problemas en ${filesWithIssues.length} archivos:\n`,
  );

  filesWithIssues.forEach(({ file, issues }) => {
    console.log(`\n📄 ${path.relative(srcDir, file)}`);
    console.log("─".repeat(80));
    issues.forEach((issue) => console.log(`  ${issue}`));
  });
}
