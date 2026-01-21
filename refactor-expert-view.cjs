const fs = require("fs");
const path = require("path");

const expertViewPath = path.join(
  __dirname,
  "src/views/expert/ExpertViewFixed.vue",
);

let content = fs.readFileSync(expertViewPath, "utf8");

// 1. Fix script imports
const importsToFix = [
  "onMounted",
  "onUnmounted",
  "ref",
  "reactive",
  "computed",
  "watch",
  "onBeforeUnmount",
];

content = content.replace(/import \{([\s\S]*?)\} from 'vue'/g, (match, p1) => {
  const existing = p1.split(",").map((s) => s.trim());
  const all = new Set([...existing, ...importsToFix]);
  return `import { ${Array.from(all).filter(Boolean).join(", ")} } from 'vue'`;
});

// 2. Fix duplicated router/useIonRouter
content = content.replace(
  /const router = useIonRouter\(\);/g,
  "// const router = useIonRouter();",
);
content = content.replace(
  /const router = useRouter\(\);/g,
  "const router = useRouter();",
);

// 3. Fix missing end tags in template (brute force for skeletons and containers)
content = content.replace(
  /<\/section>\s*<\/section>\s*<section v-else>/g,
  "</section>\n      <section v-else>",
);

// 4. Fix the specific "Element is missing end tag" at line 51 area (from previous skeletal mess)
// Actually I already replaced the skeletons, so if it's still there it's deeper.

// 5. Fix duplicated attributes again
function dedupeAttrs(tag) {
  // Regex for class="..."
  let classes = [];
  tag = tag.replace(/class="([^"]*)"/g, (m, p1) => {
    classes.push(p1);
    return "";
  });
  if (classes.length > 0)
    tag = tag.replace(
      />$/,
      ` class="${Array.from(new Set(classes.join(" ").split(/\s+/))).join(
        " ",
      )}">`,
    );

  let styles = [];
  tag = tag.replace(/style="([^"]*)"/g, (m, p1) => {
    styles.push(p1);
    return "";
  });
  if (styles.length > 0)
    tag = tag.replace(
      />$/,
      ` style="${Array.from(new Set(styles.join(";").split(";")))
        .filter(Boolean)
        .join(";")}">`,
    );

  return tag;
}

content = content.replace(/<[a-z0-9-]+[^>]*>/gi, (match) => {
  if (match.includes('class="') || match.includes('style="')) {
    // Very crude way to check for multiple occurrences
    if (
      (match.match(/class="/g) || []).length > 1 ||
      (match.match(/style="/g) || []).length > 1
    ) {
      return dedupeAttrs(match);
    }
  }
  return match;
});

// 6. Fix "h2 inside h2" garbage if any left
content = content.replace(/<h[1-6][^>]*><h[1-6]/g, (match) => {
  return match.replace(/<h[1-6]/g, "<div");
});
content = content.replace(/<\/h[1-6]>\s*<\/h[1-6]>/g, "</div>\n      </h2>");

fs.writeFileSync(expertViewPath, content);
console.log("Refactored ExpertViewFixed.vue");
