import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export const DeferUntilViewport = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerElement = observerRef.current;
    const handle: IntersectionObserverCallback = (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handle, {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    });

    if (observerElement) {
      observer.observe(observerElement);

      return () => observer.disconnect();
    }
  }, []);

  if (isVisible) {
    return children;
  }

  // Observe placeholder div until in viewport
  return <div ref={observerRef} />;
};
