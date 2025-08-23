import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { motion } from "motion/react";
import { SiYoutube, SiLinkedin, SiTiktok, SiGmail } from "react-icons/si";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Navega o scrollea según contexto
  const go = (
    e: React.MouseEvent,
    target: "top" | "cursos" | "libro" | "contacto"
  ) => {
    e.preventDefault();
    if (!isHome) {
      navigate("/", { state: { scrollTo: target } });
      return;
    }
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scroller.scrollTo(target, { smooth: true, duration: 600, offset: -80 });
    }
  };

  return (
    <footer className="bg-black/90 border-t border-white/10 text-white mt-12">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-10 md:grid-cols-3">
        {/* Logo + descripción */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2
            style={{ fontFamily: "Koulen, sans-serif" }}
            className="text-2xl uppercase"
          >
            PROFESANTIAGO
          </h2>
          <p className="mt-3 text-sm text-white/70 max-w-xs">
            Cursos gratuitos, libros y material de clase para aprender
            informática de forma clara y práctica.
          </p>
        </motion.div>

        {/* Navegación rápida (scroll suave en home) */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-2 text-sm"
          aria-label="Navegación de pie de página"
        >
          <span className="uppercase font-semibold text-white/80 text-xs tracking-wider">
            Navegación
          </span>

          <a
            href="/"
            onClick={(e) => go(e, "top")}
            className="cursor-pointer hover:text-white"
          >
            Inicio
          </a>

          <a
            href="/cursos"
            onClick={(e) => go(e, "cursos")}
            className="cursor-pointer hover:text-white"
          >
            Cursos
          </a>

          <a
            href="/libro"
            onClick={(e) => go(e, "libro")}
            className="cursor-pointer hover:text-white"
          >
            Libro
          </a>

          {/* Página aparte */}
          <a href="/material" className="hover:text-white">
            Material
          </a>

          <a
            href="/contacto"
            onClick={(e) => go(e, "contacto")}
            className="cursor-pointer hover:text-white"
          >
            Contacto
          </a>
        </motion.nav>

        {/* Redes sociales */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-label="Redes sociales"
        >
          <span className="uppercase font-semibold text-white/80 text-xs tracking-wider">
            Conectemos
          </span>
          <div className="mt-3 flex gap-4 text-xl">
            <a
              href="mailto:contacto@profesantiago.com"
              className="hover:text-red-400"
              aria-label="Mail"
            >
              <SiGmail />
            </a>
            <a
              href="https://www.youtube.com/@ProfesorSantiago"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500"
              aria-label="YouTube"
            >
              <SiYoutube />
            </a>
            <a
              href="https://www.linkedin.com/in/santiago-german-martinez-genta-642904205"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <SiLinkedin />
            </a>
            <a
              href="https://www.tiktok.com/@ProfeSantiago"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
              aria-label="TikTok"
            >
              <SiTiktok />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Derechos */}
      <div className="border-t border-white/10 text-center py-2 text-xs text-white/50">
        © {new Date().getFullYear()} ProfeSantiago — Derechos reservados sobre
        el contenido propio.
      </div>

      {/* Créditos */}
      <div className="text-center py-3 text-xs text-white/60">
        Hecho con <span className="text-red-500">❤</span> por{" "}
        <a
          href="https://www.ignaciofianza.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white underline"
        >
          Ignacio Fianza
        </a>
      </div>
    </footer>
  );
};

export default Footer;
