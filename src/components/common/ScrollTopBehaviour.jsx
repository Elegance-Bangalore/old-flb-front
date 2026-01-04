import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTopBehaviour() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    return () => {
      sessionStorage.setItem(`scrollPosition-${key}`, window.scrollY);
    };
  }, [key]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(`scrollPosition-${key}`);
    if (pathname === "/property-list/") {
      return;
    }

    if (savedPosition !== null) {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, key]);

  return null;
}
