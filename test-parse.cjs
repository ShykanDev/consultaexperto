const fs = require("fs");
const path = require("path");
const { parse } = require("@vue/compiler-sfc");

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== "node_modules" && file !== ".git") {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith(".vue")) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
};

const vueFiles = getAllFiles(__dirname);

console.log(`--- Testing ${vueFiles.length} Vue Templates ---`);

let totalErrors = 0;
vueFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  try {
    const { descriptor, errors } = parse(content);
    if (errors && errors.length > 0) {
      console.log(`PARSE ERROR in ${file}:`);
      errors.forEach((err) => {
        console.log(`  - ${err.message} (Line ${err.loc?.start.line})`);
        totalErrors++;
      });
    }
  } catch (e) {
    console.log(`CRITICAL ERROR in ${file}: ${e.message}`);
    totalErrors++;
  }
});

console.log("--- Testing Completed ---");
if (totalErrors > 0) {
  console.log(`Found ${totalErrors} errors total.`);
} else {
  console.log("No template errors found!");
}
