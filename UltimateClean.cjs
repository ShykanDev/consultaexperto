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

console.log(`--- Cleaning ${vueFiles.length} Vue Files ---`);

vueFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let original = content;

  // 1. Remove garbage symbols from attributes
  content = content.replace(/: \/ class=/g, "class=");
  content = content.replace(/: \/ /g, " ");

  // 2. Fix garbled :class
  content = content.replace(/: class="([^"]*)"/g, ':class="$1"');

  // 3. Fix duplicated class and style attributes
  content = content.replace(/<[a-z0-9-]+[^>]*>/gi, (tag) => {
    if (!tag.includes('class="') && !tag.includes('style="')) return tag;

    // Split tag into parts but keep attribute values together
    const attrRegex = /([a-z:@-]+)="([^"]*)"/gi;
    let attrs = {};
    let classes = [];
    let styles = [];

    let match;
    let lastIndex = 0;
    let baseTag = tag.substring(0, tag.indexOf(" "));
    if (baseTag === tag) return tag; // no attrs

    while ((match = attrRegex.exec(tag)) !== null) {
      let name = match[1].toLowerCase();
      let value = match[2];

      if (name === "class") {
        classes.push(value);
      } else if (name === "style") {
        styles.push(value);
      } else {
        attrs[name] = value;
      }
    }

    let newTag = baseTag;

    // Merge classes
    if (classes.length > 0) {
      const merged = Array.from(new Set(classes.join(" ").split(/\s+/)))
        .filter(Boolean)
        .join(" ");
      newTag += ` class="${merged}"`;
    }
    // Merge styles
    if (styles.length > 0) {
      const merged = Array.from(new Set(styles.join(";").split(";")))
        .filter(Boolean)
        .join(";");
      newTag += ` style="${merged}"`;
    }
    // Add other attrs
    for (let name in attrs) {
      newTag += ` ${name}="${attrs[name]}"`;
    }

    // Close tag
    if (tag.endsWith("/>")) newTag += " />";
    else newTag += ">";

    return newTag;
  });

  // 4. Fix "option closed with div"
  content = content.replace(
    /<option([^>]*)>([\s\S]*?)<\/div>/g,
    "<option$1>$2</option>",
  );

  // 5. Fix stray </h1> closing something else
  // Many files have </h1> closing a <div class="web-buttons"> or similar
  content = content.replace(
    /<div class="web-buttons[^>]*>([\s\S]*?)<\/h1>/g,
    '<div class="web-buttons"> $1 </div>',
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
});

console.log("Ultimate cleaning completed.");
