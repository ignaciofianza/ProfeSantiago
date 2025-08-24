import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MATERIALS_DIR = path.join(ROOT, "public", "materiales");
const OUTPUT = path.join(ROOT, "public", "materiales.manifest.json");

function walk(dir, baseUrl = "/materiales") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const children = [];

  for (const e of entries) {
    if (e.name.startsWith(".")) continue; // ignora ocultos
    const full = path.join(dir, e.name);
    const url = `${baseUrl}/${encodeURIComponent(e.name)}`;

    if (e.isDirectory()) {
      children.push({
        type: "dir",
        name: e.name,
        url,
        children: walk(full, url),
      });
    } else {
      children.push({
        type: "file",
        name: e.name,
        url,
      });
    }
  }

  // Ordenar: carpetas primero, luego archivos A→Z
  children.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name, "es", { numeric: true });
  });

  return children;
}

function run() {
  if (!fs.existsSync(MATERIALS_DIR)) {
    fs.mkdirSync(MATERIALS_DIR, { recursive: true });
  }
  const tree = {
    generatedAt: new Date().toISOString(),
    items: walk(MATERIALS_DIR),
  };
  fs.writeFileSync(OUTPUT, JSON.stringify(tree, null, 2), "utf-8");
  console.log(`✓ Manifest generado: ${OUTPUT}`);
}

run();
