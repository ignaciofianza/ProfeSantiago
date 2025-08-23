import { useRef } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { motion, useScroll, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { FiChevronDown } from "react-icons/fi";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  // hook de framer-motion para detectar cuánto scrolleo dentro del hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // cuando scrolleo, el fondo se hace zoom (1 → 1.3) (AUMENTAR 1.3 SI SE QUIERE MAS ZOOM (segun gpt yo ni idea))
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] text-white"
      aria-label="Hero principal"
    >
      {/* ================== FONDO ================== */}
      {/* imagen de fondo + efecto de zoom con framer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url("/images/banner.png")',
          backgroundSize: "cover", // que cubra todo el contenedor
          backgroundPosition: "center", // siempre centrada
          scale: bgScale, // se aplica el zoom animado
        }}
      />
      {/* capa negra semitransparente encima para que los textos se lean siempre */}
      <div className="absolute inset-0 -z-10 bg-black/65" />

      {/* ================== CONTENIDO ================== */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* título con tipografía distinta y blur, pienso q se destaca mas */}
        <motion.h1
          style={{ fontFamily: "Koulen, sans-serif" }} // tipografía custom solo acá
          className="text-5xl sm:text-6xl uppercase bg-black/60 backdrop-blur-sm rounded-md p-3 inline-block"
          initial={{ opacity: 0, y: 16 }} // aparece desde abajo
          animate={{ opacity: 1, y: 0 }} // animación de entrada
          transition={{ duration: 0.45 }}
        >
          PROFESANTIAGO
        </motion.h1>

        {/* subtítulo breve para contexto */}
        <motion.p
          className="mt-5 max-w-2xl text-lg border border-white/20 bg-black/30 backdrop-blur-sm rounded-md p-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          Profesor · Escritor · YouTuber — Cursos gratis, libros y materiales de
          clase para aprender más rápido y mejor.
        </motion.p>

        {/* ================== BOTONES CTA ================== */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          {/* botón que lleva al canal de YouTube */}
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

          {/* botón que scrollea a la sección de cursos (usa react-scroll) */}
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30"
          >
            <ScrollLink to="cursos" smooth={true} duration={600}>
              Cursos Gratuitos
            </ScrollLink>
          </Button>

          {/* botón interno con react-router hacia material */}
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white/30"
          >
            <Link to="/material">Material de Clase</Link>
          </Button>
        </motion.div>

        {/* ================== BADGES / TAGS ================== */}
        {/* mini etiquetas con las temáticas de la web */}
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

        {/* ================== INDICADOR DE SCROLL ================== */}
        {/* aviso para que el usuario siga bajando */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.35 }}
        >
          <span className="text-2xl sm:text-3xl font-bold tracking-wide">
            Desliza para ver más
          </span>
          {/* ícono flecha abajo animado con loop infinito */}
          <motion.div
            animate={{ y: [0, 18, 0] }} // sube y baja
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
