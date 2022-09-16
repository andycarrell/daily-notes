import { useEffect } from "react";

export const useScrollIntoViewport = ({ id }: { id: string }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.getElementById(id) ?? null;
      const top = element ? element.getBoundingClientRect().y : null;

      if (top > 100) {
        window.scrollBy({ top, behavior: "smooth" });
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [id]);
};
