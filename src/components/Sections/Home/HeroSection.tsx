import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion, useScroll, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiChevronDown } from "react-icons/fi";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Detecta el scroll dentro del hero para el zoom del fondo
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Preload del banner (sin Helmet): inyecta <link rel="preload"> en <head>
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Evita duplicados si hot-reload
    const existing = document.querySelector('link[data-banner-preload="true"]');
    if (existing) return;

    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "image");
    link.setAttribute("href", "/images/optimized/banner-1920.avif");
    link.setAttribute(
      "imagesrcset",
      [
        "/images/optimized/banner-1280.avif 1280w",
        "/images/optimized/banner-1920.avif 1920w",
        "/images/optimized/banner-2560.avif 2560w",
      ].join(", ")
    );
    link.setAttribute("imagesizes", "100vw");
    link.setAttribute("fetchpriority", "high");
    link.setAttribute("data-banner-preload", "true");

    document.head.appendChild(link);
    return () => {
      // opcional: limpiar al desmontar
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] text-white overflow-hidden"
      aria-label="Hero principal"
    >
      {/* ================== FONDO (optimizado) ================== */}
      {/* Gradiente base: aparece al instante */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-black/70 to-black" />

      {/* (Opcional) LQIP super liviano para cero flash; es un 1x1 negro */}
      <img
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover blur-[2px] scale-105"
        src="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACwAAAAAAQABAAACAkQBADs="
        alt=""
        loading="eager"
        decoding="async"
      />

      {/* Imagen real responsive + prioridad alta + zoom con framer */}
      <motion.picture
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ scale: bgScale }}
      >
        <source
          type="image/avif"
          srcSet="/images/optimized/banner-1280.avif 1280w, /images/optimized/banner-1920.avif 1920w, /images/optimized/banner-2560.avif 2560w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/optimized/banner-1280.webp 1280w, /images/optimized/banner-1920.webp 1920w, /images/optimized/banner-2560.webp 2560w"
          sizes="100vw"
        />
        <motion.img
          className="h-full w-full object-cover"
          src="/images/optimized/banner-1920.jpg"
          srcSet="/images/optimized/banner-1280.jpg 1280w, /images/optimized/banner-1920.jpg 1920w, /images/optimized/banner-2560.jpg 2560w"
          sizes="100vw"
          alt=""
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </motion.picture>

      {/* Overlay para legibilidad del texto */}
      <div className="absolute inset-0 -z-10 bg-black/65" />

      {/* ================== CONTENIDO ================== */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Título */}
        <motion.h1
          style={{ fontFamily: "Koulen, sans-serif" }}
          className="text-5xl sm:text-6xl uppercase bg-black/60 backdrop-blur-sm rounded-md p-3 inline-block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          PROFESANTIAGO
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="mt-5 max-w-2xl text-lg border border-white/20 bg-black/30 backdrop-blur-sm rounded-md p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          Profesor · Escritor · YouTuber — Cursos gratis, libros y materiales de
          clase para aprender más rápido y mejor.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <Button
            asChild
            className="bg-white text-black font-semibold hover:bg-white/70"
          >
            <a
              href="https://www.youtube.com/@ProfesorSantiago"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Canal
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30"
          >
            <ScrollLink to="cursos" smooth={true} duration={600}>
              Cursos Gratuitos
            </ScrollLink>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30"
          >
            <Link to="/material">Material de Clase</Link>
          </Button>
        </motion.div>

        {/* Badges */}
        <motion.ul
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.35 }}
        >
          {[
            "Sistemas Operativos",
            "Redes",
            "Soporte de equipos",
            "Linux",
            "Docker",
          ].map((t) => (
            <li key={t}>
              <Badge
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transition"
              >
                {t}
              </Badge>
            </li>
          ))}
        </motion.ul>

        {/* Indicador de scroll */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.35 }}
        >
          <span className="text-2xl sm:text-3xl font-bold tracking-wide">
            Desliza para ver más
          </span>
          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <FiChevronDown size={64} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
