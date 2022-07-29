import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

export const RenderIntoPortal = ({ id, children }: Props) => {
  const [portal, setPortal] = useState(() =>
    typeof document === "undefined" ? null : document.getElementById(id)
  );

  useEffect(() => {
    const p = document.getElementById(id);
    if (p !== portal) {
      setPortal(p);
    }
  }, [portal, id]);

  if (portal) {
    return createPortal(children, portal);
  }
};
