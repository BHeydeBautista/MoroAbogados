import fs from "node:fs";
import path from "node:path";

const root = path.join("src", "data");
const srcPath = path.join(root, "lawyerData.ts");

const text = fs.readFileSync(srcPath, "utf8");

const marker = "export const lawyerDetails";
const idx = text.indexOf(marker);
if (idx === -1) {
  throw new Error("Could not find lawyerDetails export");
}

const interfacePart = text.slice(0, idx).replace(/\s*$/, "") + "\n";
fs.writeFileSync(path.join(root, "lawyerTypes.ts"), interfacePart, "utf8");

function findObjectForKey(key) {
  const needle = `"${key}"`;
  const start = text.indexOf(needle, idx);
  if (start === -1) throw new Error(`Key not found: ${key}`);

  const colon = text.indexOf(":", start);
  if (colon === -1) throw new Error("Colon not found after key");

  const braceStart = text.indexOf("{", colon);
  if (braceStart === -1) throw new Error("Opening brace not found");

  let i = braceStart;
  let depth = 0;
  let inStr = false;
  let strChar = "";
  let escape = false;

  while (i < text.length) {
    const ch = text[i];

    if (inStr) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === strChar) {
        inStr = false;
        strChar = "";
      }
    } else {
      if (ch === '"' || ch === "'") {
        inStr = true;
        strChar = ch;
      } else if (ch === "{") {
        depth += 1;
      } else if (ch === "}") {
        depth -= 1;
        if (depth === 0) {
          return text.slice(braceStart, i + 1);
        }
      }
    }

    i += 1;
  }

  throw new Error("Unterminated object literal");
}

function writeLawyerModule({ slug, exportName, outFile }) {
  const obj = findObjectForKey(slug);
  const content =
    'import type { Lawyer } from "../lawyerTypes";\n\n' +
    `export const ${exportName} = ${obj} satisfies Lawyer;\n`;

  fs.writeFileSync(outFile, content, "utf8");
}

const lawyersDir = path.join(root, "lawyers");
fs.mkdirSync(lawyersDir, { recursive: true });

writeLawyerModule({
  slug: "dr-carlos-moro",
  exportName: "drCarlosMoro",
  outFile: path.join(lawyersDir, "dr-carlos-moro.ts"),
});

writeLawyerModule({
  slug: "dr-emilio-f-moro",
  exportName: "drEmilioFMoro",
  outFile: path.join(lawyersDir, "dr-emilio-f-moro.ts"),
});

console.log("Generated src/data/lawyerTypes.ts");
console.log("Generated src/data/lawyers/dr-carlos-moro.ts");
console.log("Generated src/data/lawyers/dr-emilio-f-moro.ts");
