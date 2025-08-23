import { motion } from "motion/react";
import ScrollToTop from "@/components/ScrollToTop";

const Material = () => {
  return (
    <>
      <ScrollToTop />
      <div className=" bg-black text-white text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Título */}
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            🚧 Coming Soon 🚧
          </h1>

          {/* Subtítulo */}
          <p className="text-white/70 max-w-md mx-auto">
            Estoy trabajando en esta sección de{" "}
            <span className="font-semibold">materiales</span>. Muy pronto vas a
            encontrar acá todos los recursos y apuntes de clase.
          </p>

          {/* Nota graciosa */}
          <p className="text-xs text-white/50 italic">
            Tip: mientras tanto, revisá los cursos o suscribite a mi canal de
            YouTube y activá la campanita 😏🔔
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Material;
