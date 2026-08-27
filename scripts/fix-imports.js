const fs = require("fs");
const path = require("path");
const dir = "components/calc";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
let changed = 0;
for (const f of files) {
  const file = path.join(dir, f);
  let s = fs.readFileSync(file, "utf8");
  const orig = s;
  // Find the display import line
  const dispRe = /import\s*\{([^}]*)\}\s*from\s*"@\/components\/display"/;
  const fieldRe = /import\s*\{([^}]*)\}\s*from\s*"@\/components\/fields"/;
  const disp = s.match(dispRe);
  const field = s.match(fieldRe);
  if (!disp) continue;
  const dispNames = disp[1].split(",").map((x) => x.trim()).filter(Boolean);
  const misplaced = dispNames.filter((n) => n === "NumberField" || n === "SelectField" || n === "UnitField");
  if (misplaced.length === 0) continue;
  // Remove misplaced from display import
  const kept = dispNames.filter((n) => !misplaced.includes(n));
  if (kept.length > 0) {
    s = s.replace(dispRe, `import { ${kept.join(", ")} } from "@/components/display"`);
  } else {
    s = s.replace(dispRe, "");
  }
  // Add to fields import (create if missing)
  if (field) {
    const fieldNames = field[1].split(",").map((x) => x.trim()).filter(Boolean);
    const merged = Array.from(new Set([...fieldNames, ...misplaced])).join(", ");
    s = s.replace(fieldRe, `import { ${merged} } from "@/components/fields"`);
  } else {
    const newline = `import { ${misplaced.join(", ")} } from "@/components/fields";`;
    // insert after the display import line
    s = s.replace(dispRe, (m) => m + "\n" + newline);
  }
  if (s !== orig) {
    fs.writeFileSync(file, s);
    changed++;
    console.log("fixed", f);
  }
}
console.log("total changed:", changed);
