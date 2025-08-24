import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FileText,
  FileArchive,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileCode,
  ArrowLeft,
  Search,
  Database,
  Terminal,
  Shield,
  Key,
  Network,
  Server,
  Globe,
  Cloud,
  Package,
  Boxes,
  Disc,
  HardDrive,
} from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";

/* ===================== Tipos ===================== */
type FileNode = { type: "file"; name: string; url: string };
type DirNode = { type: "dir"; name: string; url: string; children: Node[] };
type Node = FileNode | DirNode;
type Manifest = { generatedAt: string; items: Node[] };

/* ===================== Utils ===================== */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const sortNodes = (a: Node, b: Node) => {
  if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
  return a.name.localeCompare(b.name, "es", {
    numeric: true,
    sensitivity: "base",
  });
};

/* Helpers para file naming */
const extOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
};
const baseOf = (name: string) => name.toLowerCase();

/* FileIcon completo */
function FileIcon({ name }: { name: string }) {
  const ext = extOf(name);
  const base = baseOf(name);

  /* ====== MEDIA ====== */
  if (
    [
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "svg",
      "avif",
      "bmp",
      "tiff",
      "ico",
    ].includes(ext)
  )
    return (
      <FileImage
        size={28}
        className="text-emerald-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["mp4", "mov", "mkv", "webm", "avi"].includes(ext))
    return (
      <FileVideo
        size={28}
        className="text-purple-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["mp3", "wav", "ogg", "flac", "m4a", "aac"].includes(ext))
    return (
      <FileAudio
        size={28}
        className="text-pink-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== IMÁGENES DE DISCO / GRANDES ====== */
  if (["iso"].includes(ext))
    return (
      <Disc
        size={28}
        className="text-indigo-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["img", "qcow2", "vmdk", "vdi", "dmg"].includes(ext))
    return (
      <HardDrive
        size={28}
        className="text-indigo-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== COMPRIMIDOS ====== */
  if (
    ["zip", "rar", "7z", "gz", "bz2", "xz", "tar", "tgz", "tgxz"].includes(ext)
  )
    return (
      <FileArchive
        size={28}
        className="text-amber-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== OFIMÁTICA / DOCS ====== */
  if (["xls", "xlsx", "csv", "ods", "tsv"].includes(ext))
    return (
      <FileSpreadsheet
        size={28}
        className="text-lime-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["ppt", "pptx", "odp", "key"].includes(ext))
    return (
      <FileSpreadsheet
        size={28}
        className="text-orange-400 group-hover:scale-110 transition-transform"
      />
    ); // reuse
  if (ext === "pdf")
    return (
      <FileText
        size={28}
        className="text-red-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["doc", "docx", "rtf", "odt"].includes(ext))
    return (
      <FileText
        size={28}
        className="text-blue-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["txt", "md", "markdown"].includes(ext))
    return (
      <FileText
        size={28}
        className="text-gray-300 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== DATA / CONFIG ====== */
  if (["json", "jsonl", "ndjson"].includes(ext))
    return (
      <FileCode
        size={28}
        className="text-yellow-300 group-hover:scale-110 transition-transform"
      />
    );
  if (["yml", "yaml", "toml", "ini", "conf", "cfg"].includes(ext))
    return (
      <FileCode
        size={28}
        className="text-teal-300 group-hover:scale-110 transition-transform"
      />
    );
  if (ext === "xml")
    return (
      <FileCode
        size={28}
        className="text-amber-300 group-hover:scale-110 transition-transform"
      />
    );
  if (["env"].includes(ext) || base === ".env" || base.startsWith(".env."))
    return (
      <FileCode
        size={28}
        className="text-green-300 group-hover:scale-110 transition-transform"
      />
    );
  if (ext === "log")
    return (
      <FileText
        size={28}
        className="text-orange-300 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== LINUX / SHELL / SCRIPTS ====== */
  if (
    ["sh", "bash", "zsh"].includes(ext) ||
    base.endsWith(".bashrc") ||
    base.endsWith(".zshrc")
  )
    return (
      <Terminal
        size={28}
        className="text-sky-400 group-hover:scale-110 transition-transform"
      />
    );
  if (["ps1", "psm1", "bat", "cmd"].includes(ext))
    return (
      <Terminal
        size={28}
        className="text-sky-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== REDES / VPN / CERTS ====== */
  if (["pcap", "pcapng", "cap", "har"].includes(ext))
    return (
      <Network
        size={28}
        className="text-cyan-400 group-hover:scale-110 transition-transform"
      />
    );
  if (ext === "ovpn" || base.includes("wireguard") || base.endsWith(".wg"))
    return (
      <Shield
        size={28}
        className="text-cyan-300 group-hover:scale-110 transition-transform"
      />
    );
  if (["pem", "crt", "cer", "der", "key", "p12", "pfx", "csr"].includes(ext))
    return (
      <Key
        size={28}
        className="text-yellow-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== SERVIDORES / WEB / INFRA ====== */
  if (
    base === "nginx.conf" ||
    base === "apache2.conf" ||
    base.endsWith(".service")
  )
    return (
      <Server
        size={28}
        className="text-purple-300 group-hover:scale-110 transition-transform"
      />
    );
  if (["html", "htm", "css", "scss", "sass"].includes(ext))
    return (
      <FileCode
        size={28}
        className="text-fuchsia-300 group-hover:scale-110 transition-transform"
      />
    );
  if (ext === "http")
    return (
      <Globe
        size={28}
        className="text-blue-300 group-hover:scale-110 transition-transform"
      />
    );
  if (["tf", "tf.json", "tfvars"].includes(ext))
    return (
      <Cloud
        size={28}
        className="text-emerald-300 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== DOCKER / K8S ====== */
  if (base === "dockerfile" || base.startsWith("dockerfile"))
    return (
      <Package
        size={28}
        className="text-blue-300 group-hover:scale-110 transition-transform"
      />
    );
  if (base === "docker-compose.yml" || base === "docker-compose.yaml")
    return (
      <Boxes
        size={28}
        className="text-blue-300 group-hover:scale-110 transition-transform"
      />
    );
  if (
    /\b(deployment|service|ingress|statefulset|daemonset|kustomization)\b/.test(
      base
    ) &&
    (ext === "yml" || ext === "yaml")
  )
    return (
      <Boxes
        size={28}
        className="text-indigo-300 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== DB / SQL ====== */
  if (
    ["sql", "sqlite", "db", "mdb", "accdb", "bson"].includes(ext) ||
    base.endsWith(".sql.gz") ||
    base.endsWith(".dump")
  )
    return (
      <Database
        size={28}
        className="text-yellow-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== CÓDIGO (general) ====== */
  if (
    [
      "js",
      "jsx",
      "ts",
      "tsx",
      "jsonc",
      "mjs",
      "cjs",
      "py",
      "php",
      "java",
      "kt",
      "kts",
      "rb",
      "go",
      "rs",
      "cs",
      "cpp",
      "c",
      "h",
      "hpp",
      "swift",
      "scala",
      "lua",
      "clj",
      "dart",
    ].includes(ext)
  )
    return (
      <FileCode
        size={28}
        className="text-sky-400 group-hover:scale-110 transition-transform"
      />
    );

  /* ====== FALLBACK ====== */
  return (
    <FileText
      size={28}
      className="text-green-400 group-hover:scale-110 transition-transform"
    />
  );
}

/* ===================== Página ===================== */
export default function MaterialesPage() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [path, setPath] = useState<DirNode[]>([]);
  const [q, setQ] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Cargar manifest
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/materiales.manifest.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Manifest;
        setManifest(data);
        setError(null);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(`No pude cargar el manifest: ${msg}`);
      }
    };
    load();
  }, []);

  // Deep-link: leer hash al montar (cuando ya hay manifest)
  useEffect(() => {
    if (!manifest) return;
    const hash = decodeURIComponent(window.location.hash.replace(/^#\/?/, "")); // "Carpeta/Sub"
    if (!hash) return;

    const parts = hash.split("/").filter(Boolean);
    const stack: DirNode[] = [];
    let level: Node[] = manifest.items;

    for (const seg of parts) {
      const next = level.find((n) => n.type === "dir" && n.name === seg) as
        | DirNode
        | undefined;
      if (!next) break;
      stack.push(next);
      level = next.children;
    }
    if (stack.length) setPath(stack);
  }, [manifest]);

  // Actualizar hash al navegar
  useEffect(() => {
    const hash = path.map((d) => encodeURIComponent(d.name)).join("/");
    const newHash = hash ? `#/${hash}` : "#";
    if (newHash !== window.location.hash)
      history.replaceState(null, "", newHash);
  }, [path]);

  // Nodo/Items actuales
  const currentItems: Node[] = useMemo(() => {
    if (!manifest) return [];
    const items =
      path.length === 0 ? manifest.items : path[path.length - 1].children;
    return [...items].sort(sortNodes);
  }, [manifest, path]);

  // Filtro local
  const filtered = useMemo(() => {
    if (!q) return currentItems;
    const nq = normalize(q);
    return currentItems.filter((n) => normalize(n.name).includes(nq));
  }, [currentItems, q]);

  // Separar carpetas/archivos y contadores
  const dirs = filtered.filter((n): n is DirNode => n.type === "dir");
  const files = filtered.filter((n): n is FileNode => n.type === "file");
  const counts = {
    total: currentItems.length,
    dirs: currentItems.filter((n) => n.type === "dir").length,
    files: currentItems.filter((n) => n.type === "file").length,
  };

  // Helpers navegación
  const goDir = (node: Node) =>
    node.type === "dir" && setPath((prev) => [...prev, node]);
  const back = () => setPath((prev) => prev.slice(0, -1));
  const reset = () => setPath([]);

  const currentTitle =
    path.length === 0 ? "Materiales" : path.map((d) => d.name).join(" / ");


  usePageTitle("Archivo de materiales");
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* HERO oscuro minimal */}
      <section className="relative overflow-hidden">
        <div className="relative px-6 pt-20 pb-10 max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            initial={{ y: -22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {currentTitle}
          </motion.h1>

          <motion.div
            className="mt-3 text-white/70 max-w-2xl"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.06 }}
          >
            <p>
              Recursos organizados por carpeta. Click para navegar; los archivos
              se abren en una nueva pestaña.
            </p>
            {manifest?.generatedAt && (
              <span className="block mt-2 text-xs text-white/50">
                Última actualización:{" "}
                {new Date(manifest.generatedAt).toLocaleString("es-UY")}
              </span>
            )}
          </motion.div>

          {/* Breadcrumb + Back */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="hover:text-white/90 transition"
              >
                /materiales
              </button>
              {path.map((p, i) => (
                <span key={p.url} className="flex items-center gap-2">
                  <span>/</span>
                  <button
                    onClick={() => setPath(path.slice(0, i + 1))}
                    className="hover:text-white/90 transition"
                    title={`Ir a ${p.name}`}
                  >
                    {p.name}
                  </button>
                </span>
              ))}
            </div>

            {path.length > 0 && (
              <button
                onClick={back}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/7 transition"
              >
                <ArrowLeft size={16} /> Volver
              </button>
            )}
          </div>

          {/* Buscador + contadores */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar en esta carpeta…"
                className="w-72 rounded-md border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                aria-label="Buscar materiales en carpeta actual"
              />
            </div>
            <div className="text-xs text-white/50">
              Carpetas ({dirs.length}/{counts.dirs}) · Archivos ({files.length}/
              {counts.files}) · Total ({filtered.length}/{counts.total})
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <main className="px-6 pb-16 max-w-7xl mx-auto">
        {/* Error */}
        {error && (
          <div className="mb-8 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              onClick={async () => {
                try {
                  setError(null);
                  const r = await fetch("/materiales.manifest.json", {
                    cache: "no-store",
                  });
                  if (!r.ok) throw new Error(`HTTP ${r.status}`);
                  const data = (await r.json()) as Manifest;
                  setManifest(data);
                } catch (e) {
                  const msg = e instanceof Error ? e.message : String(e);
                  setError(`No pude cargar el manifest: ${msg}`);
                }
              }}
              className="rounded-md border border-red-500/30 bg-red-500/20 px-3 py-1 hover:bg-red-500/30 transition"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Skeleton */}
        {!manifest && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-white/10 bg-white/4 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty (tras filtrar) */}
        {manifest && filtered.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/4 p-8 text-center text-white/70">
            {q
              ? "No hay resultados para tu búsqueda en esta carpeta."
              : "No hay elementos en esta carpeta."}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {dirs.map((dir, idx) => (
              <motion.button
                key={dir.url}
                role="button"
                aria-label={`Abrir carpeta ${dir.name}`}
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && goDir(dir)
                }
                onClick={() => goDir(dir)}
                className="group text-left p-5 rounded-xl border border-white/10 bg-white/4 hover:bg-white/6 hover:border-blue-500 transition flex items-center gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.28, delay: idx * 0.02 }}
                title={dir.name}
              >
                <Folder className="text-blue-400" size={30} />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{dir.name}</div>
                  <div className="text-xs text-white/60">Carpeta</div>
                </div>
              </motion.button>
            ))}

            {files.map((file, idx) => (
              <motion.a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir archivo ${file.name}`}
                title={file.name}
                className="group p-5 rounded-xl border border-white/10 bg-white/4 hover:bg-white/6 hover:border-green-500 transition flex items-center gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.28, delay: idx * 0.02 }}
              >
                <FileIcon name={file.name} />
                <div className="min-w-0">
                  <div className="font-medium truncate">{file.name}</div>
                  <div className="text-xs text-white/60">Archivo</div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
