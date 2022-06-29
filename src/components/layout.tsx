import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => (
  <div className="bg-gray-800 min-h-screen">{children}</div>
);

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => (
  <div
    className={`h-full mx-auto flex flex-col items-center px-4 pb-12 pt-12 ${className}`.trim()}
  >
    {children}
  </div>
);

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div className="w-full border-2 border-gray-600 bg-gray-700/40 shadow-md rounded-lg">
    {children}
  </div>
);
