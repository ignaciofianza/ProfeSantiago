import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  LuBookOpen,
  LuShieldCheck,
  LuNetwork,
  LuTerminal,
} from "react-icons/lu";

const LibroSection = () => {
  return (
    // Sección del libro
    <section className="bg-black text-white py-12 sm:py-16" id="libro">
      {/* Grid responsive */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
        {/* Portada */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          {/* Contenedor con proporción fija */}
          <div className="w-full max-w-sm aspect-[3/4] rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/optimized/libro-1280.avif 1280w, /images/optimized/libro-1920.avif 1920w, /images/optimized/libro-2560.avif 2560w"
                sizes="(min-width:1024px) 24rem, 90vw"
              />
              <source
                type="image/webp"
                srcSet="/images/optimized/libro-1280.webp 1280w, /images/optimized/libro-1920.webp 1920w, /images/optimized/libro-2560.webp 2560w"
                sizes="(min-width:1024px) 24rem, 90vw"
              />
              <img
                className="h-full w-full object-cover"
                src="/images/optimized/libro-1280.jpg"
                srcSet="/images/optimized/libro-1280.jpg 1280w, /images/optimized/libro-1920.jpg 1920w, /images/optimized/libro-2560.jpg 2560w"
                sizes="(min-width:1024px) 24rem, 90vw"
                alt="Portada del libro: Soporte de equipos informáticos"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </picture>
          </div>
        </motion.div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          {/* Título */}
          <h2 className="text-xl sm:text-3xl font-bold">
            📘 Soporte de equipos informáticos
          </h2>

          {/* Subcopy */}
          <p className="mt-2 sm:mt-3 text-white/85 max-w-xl text-sm sm:text-base">
            Para seguir profundizando. <br className="hidden sm:block" />
            Información actualizada, con imágenes y ordenado por capítulos.
            Ideal para estudiar y complementar los cursos grabados. 💪
          </p>

          {/* Pitch */}
          <p className="mt-3 sm:mt-4 text-white/80 max-w-xl text-sm sm:text-[15px]">
            🧠 Nunca pares de aprender. Este libro es un{" "}
            <span className="font-semibold">acercamiento práctico</span> al
            mundo de las computadoras: funcionamiento, armado y mantenimiento.
            También incluye
            <span className="font-semibold"> sistemas operativos</span>,{" "}
            <span className="font-semibold">seguridad</span>,{" "}
            <span className="font-semibold">redes</span> y una introducción a{" "}
            <span className="font-semibold">Linux</span>, con material técnico
            de alta calidad e imágenes de alta resolución.
          </p>

          {/* Bullets */}
          <ul className="mt-4 sm:mt-5 space-y-2 text-white/85 text-sm sm:text-[15px]">
            <li className="flex items-start gap-2">
              <LuBookOpen className="mt-1 shrink-0" aria-hidden />
              <span>
                Capítulos claros: hardware, mantenimiento, SO, redes y más.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LuShieldCheck className="mt-1 shrink-0" aria-hidden />
              <span>
                Buenas prácticas y seguridad: del diagnóstico a la prevención.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LuNetwork className="mt-1 shrink-0" aria-hidden />
              <span>
                Introducción a redes (modelos, protocolos y servicios clave).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LuTerminal className="mt-1 shrink-0" aria-hidden />
              <span>Primeros pasos en Linux para administración real.</span>
            </li>
          </ul>

          {/* Metadatos */}
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/60">
            <p>📄 267 páginas · 💾 35.7MB · 🖼️ Imágenes en alta calidad</p>
          </div>

          {/* CTAs */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-3">
            <Button
              asChild
              className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-white/90"
            >
              <a
                href="https://pay.hotmart.com/G46798813O?checkoutMode=10&bid=1755902617798"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar libro de soporte de equipos informáticos
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto border-white/30 text-black opacity-80"
              disabled
              title="Muy pronto 🔜🔥"
            >
              Comprar libro de redes (muy pronto 🔜🔥)
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LibroSection;
