import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Cierro el menú al cambiar de ruta
  useEffect(() => setOpen(false), [location.pathname]);

  // Data sin tocar
  const navItems = [
    { name: "Inicio", to: "/" },
    { name: "Cursos", to: "/cursos" },
    { name: "Libro", to: "/libro" },
    { name: "Material", to: "/material" },   // otra página
    { name: "Contacto", to: "/contacto" },   // sección en home
  ];

  // Scroll suave cuando estoy en "/"
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemTo: string
  ) => {
    if (!isHome) return; // fuera de home, navegar normal

    // mapa de rutas -> id de sección
    const mapAnchor: Record<string, string> = {
      "/": "top",
      "/cursos": "cursos",
      "/libro": "libro",
      "/contacto": "contacto", // 👈 agregado
      // "/material": (no scrollea, es otra página)
    };

    const target = mapAnchor[itemTo];
    if (!target) return;

    e.preventDefault();

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 600,
        offset: -80, // despega del header sticky
      });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md bg-black/80 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo: vuelve arriba en home */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              style={{ fontFamily: "Koulen, sans-serif" }}
              className="text-4xl uppercase bg-gradient-to-r from-white to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] transition duration-300"
              onClick={(e) => handleNavClick(e, "/")}
              aria-label="Ir al inicio"
            >
              PROFESANTIAGO
            </Link>
          </motion.div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-white/90">
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={item.to}
                  className="relative group text-lg font-medium"
                  onClick={(e) => handleNavClick(e, item.to)}
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all group-hover:w-full group-hover:shadow-[0_0_8px_#fff]" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: botón */}
          <button
            className="md:hidden text-white hover:text-gray-300 text-2xl"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile: menú desplegable */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md px-6 py-4 space-y-4 text-white/90"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.to}
                  className="block text-lg font-medium hover:text-white hover:shadow-[0_0_8px_#fff]"
                  onClick={(e) => handleNavClick(e, item.to)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <Button
              asChild
              className="w-full bg-white text-black font-bold rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:bg-black hover:text-white hover:border hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition"
            >
              <a
                href="https://www.youtube.com/@ProfesorSantiago"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canal
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
