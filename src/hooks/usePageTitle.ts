import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook para actualizar el título de la página
 * @param pageTitle - Texto a mostrar junto al título base
 */
const usePageTitle = (pageTitle: string): void => {
  const location = useLocation();
  const baseTitle = "ProfeSantiago";

  useEffect(() => {
    document.title = `${baseTitle} - ${pageTitle}`;
  }, [pageTitle, location, baseTitle]);
};

export default usePageTitle;
