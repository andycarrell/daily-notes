import React, { useEffect, useRef, useState } from "react";

const DeferUntilViewport = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
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

export default DeferUntilViewport;
