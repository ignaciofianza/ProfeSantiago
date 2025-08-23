import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Establecer el estilo para deshabilitar la animación de desplazamiento
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ScrollToTop;