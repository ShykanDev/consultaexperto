const fs = require("fs");
const path = require("path");

const directory = "./src";

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith(".vue") || file.endsWith(".ts")) {
      processFile(filePath);
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Replace useIonRouter with useRouter
  content = content.replace(/useIonRouter\(\)/g, "useRouter()");
  content = content.replace(
    /import \{.*useIonRouter.*\} from '@ionic\/vue';/g,
    (match) => {
      return "import { useRouter } from 'vue-router';";
    },
  );

  // Actually, some might have multiple imports from @ionic/vue
  content = content.replace(/from '@ionic\/vue'/g, "from '@ionic/vue'"); // no-op but identifies

  // Replace router.navigate with router.push
  content = content.replace(/\.navigate\(([^,)]+),?[^)]*\)/g, ".push($1)");

  // Replace toastController with useToast
  if (content.includes("toastController")) {
    if (!content.includes("import { useToast } from 'vue-toastification'")) {
      content = content.replace(/import \{.*\} from 'vue';/g, (match) => {
        return match + "\nimport { useToast } from 'vue-toastification';";
      });
    }
    content = content.replace(/const toast = useToast\(\);/g, ""); // avoid duplicates if already there
    content = content.replace(
      /setup.*\{/g,
      (match) => match + "\n  const toast = useToast();",
    );

    // This part is tricky, replacing the function body of presentToast is better done manually or with regex if consistent
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Processed: ${filePath}`);
  }
}

walk(directory);
