import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LuTerminal } from "react-icons/lu";
import ScrollToTop from "@/components/ScrollToTop";
import usePageTitle from "@/hooks/usePageTitle";

const Err404 = () => {
  usePageTitle("Ruta no encontrada");
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const path = `${pathname}${search}${hash}` || "/";
  const domain = "profesantiago.com";
  const ip = "192.0.78.25"; // ejemplo fijo para el ping

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-5">
        <div className="w-full max-w-xl text-center">
          <motion.h1
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            404 — Ruta no encontrada
          </motion.h1>

          <p className="mt-2 text-white/75">
            <code className="font-mono">{path}</code> no existe.
          </p>

          {/* Terminal compacta */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="mt-5 text-left font-mono text-xs sm:text-sm bg-white/[0.04] border border-white/10 rounded-md p-3"
            aria-label="Salida de terminal"
          >
            <div className="flex items-center gap-2 text-white/90">
              <LuTerminal className="shrink-0" />
              <span>root@proxmox:~#</span>
              <span className="text-white"> ping -c 5 {domain}</span>
            </div>

            <div className="mt-2 space-y-0.5">
              <p className="text-white/80">
                PING {domain} ({ip}) 56(84) bytes of data.
              </p>
              <p className="text-emerald-300">
                64 bytes from {ip}: icmp_seq=1 ttl=57 time=32.0 ms
              </p>
              <p className="text-emerald-300">
                64 bytes from {ip}: icmp_seq=3 ttl=57 time=31.4 ms
              </p>
              <p className="text-emerald-300">
                64 bytes from {ip}: icmp_seq=4 ttl=57 time=32.1 ms
              </p>
              <p className="text-emerald-300">
                64 bytes from {ip}: icmp_seq=5 ttl=57 time=31.5 ms
              </p>
              <p className="mt-2 text-white/80">
                --- {domain} ping statistics ---
              </p>
              <p className="text-white/70">
                5 packets transmitted, 4 received, 20% packet loss, time 4068ms
              </p>
              <p className="text-white/70">
                rtt min/avg/max/mdev = 31.421/31.746/32.063/0.301 ms
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-white/90">
              <span>root@proxmox:~#</span>
              <span className="text-white">
                {" "}
                ping -c 5 {domain}
                {path}
              </span>
            </div>
            <p className="mt-1 text-red-400">
              ping: {domain}
              {path}: Name or service not known
            </p>

            <p className="mt-3 text-white/70">
              Tip: <span className="text-white">sudo dnf install</span>{" "}
              <span className="underline decoration-dotted">cerebro</span> (es
              chiste, pero probá F5)
            </p>
          </motion.div>

          {/* Botones */}
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Button
              asChild
              className="bg-white text-black font-semibold hover:bg-white/85"
            >
              <Link to="/">🏠 Inicio</Link>
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="bg-transparent border border-white/30 text-white font-semibold hover:bg-white/10"
            >
              🔙 Atrás
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Err404;
