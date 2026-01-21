const fs = require("fs");
const filePath =
  "/Users/chemex/Desktop/shykan/Consulta Experto Web Vue/consultaexpertoapp/src/views/expert/ExpertViewFixed.vue";

let content = fs.readFileSync(filePath, "utf8");

// Fix the "web-card ... web-card ..." mess
content = content.replace(/class="web-card[^"]*web-card/g, 'class="web-card');

// Fix the "overflow-hiddenclass="
content = content.replace(
  /overflow-hiddenclass="/g,
  'overflow-hidden" class="',
);

// Fix the "web-card ... class="web-card-header"
content = content.replace(
  /web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hiddenclass=/g,
  "class=",
);

// Fix nested web-card classes
content = content.replace(
  /class="web-card[^"]*web-card-content/g,
  'class="web-card-content',
);
content = content.replace(
  /class="web-card[^"]*web-card-header/g,
  'class="web-card-header',
);
content = content.replace(
  /class="web-card[^"]*web-card-title/g,
  'class="web-card-title',
);

// Fix the duplicate classes again specifically for this file
content = content.replace(
  /class="([^"]*)"\s+class="([^"]*)"/g,
  'class="$1 $2"',
);

fs.writeFileSync(filePath, content);
console.log("Fixed ExpertViewFixed.vue");
