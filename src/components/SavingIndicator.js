import React, { useEffect, useState, useRef } from "react";

const SavingIndicator = ({ children, isSaving = false }) => {
  const [debounced, setDebounced] = useState(isSaving);
  const id = useRef(null);

  useEffect(() => {
    if (isSaving) {
      clearTimeout(id.current);
      setDebounced(isSaving);
    } else {
      id.current = setTimeout(() => setDebounced(isSaving), 1500);
    }
  }, [isSaving]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        debounced ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default SavingIndicator;
