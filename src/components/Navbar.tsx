import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Cerrar menú al cambiar de ruta
  useEffect(() => setOpen(false), [location.pathname]);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navItems = [
    { name: "Inicio", to: "/" },
    { name: "Cursos", to: "/cursos" },
    { name: "Libro", to: "/libro" },
    { name: "Material", to: "/material" }, // página aparte
    { name: "Contacto", to: "/contacto" },
  ];

  // Rutas de navbar que son secciones en la home
  const anchors: Record<string, "top" | "cursos" | "libro" | "contacto"> = {
    "/": "top",
    "/cursos": "cursos",
    "/libro": "libro",
    "/contacto": "contacto",
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemTo: string
  ) => {
    const target = anchors[itemTo];
    if (!target) return; // /material u otras rutas -> navegación normal

    e.preventDefault();

    if (!isHome) {
      // Fuera de la home: ir a "/" y luego scrollear (Home debe leer location.state.scrollTo)
      navigate("/", { state: { scrollTo: target } });
      setOpen(false);
      return;
    }

    // En la home: scroll suave
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scroller.scrollTo(target, { smooth: true, duration: 600, offset: -80 });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md bg-black/80 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Mobile button */}
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

      {/* Mobile floating menu + backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop clickeable */}
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel flotante (debajo del navbar) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 md:hidden left-0 right-0 top-16
                         bg-black/95 border-b border-white/10
                         px-6 py-4 space-y-4 text-white/90"
              role="dialog"
              aria-modal="true"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.02 * i }}
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
                className="w-full bg-white text-black font-bold rounded-lg
                           shadow-[0_0_10px_rgba(255,255,255,0.6)]
                           hover:bg-black hover:text-white hover:border hover:border-white
                           hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition"
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
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
