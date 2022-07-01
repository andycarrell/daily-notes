import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export const DeferUntilViewport = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const handle: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handle, {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    });

    observer.observe(observerRef.current);
  }, []);

  if (isVisible) {
    return children;
  }

  // Observe placeholder div until in viewport
  return <div ref={observerRef} />;
};
