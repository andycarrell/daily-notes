import React from "react";

export const Page = ({ children }) => (
  <div className="bg-gray-800 min-h-screen">{children}</div>
);

export const Layout = ({ children, className = "" }) => (
  <div
    className={`h-full max-w-2xl mx-auto flex flex-col items-center px-4 pt-12 sm:pt-[16vh] ${className}`}
  >
    {children}
  </div>
);

export const Card = ({ children }) => (
  <div className="w-full border-2 border-gray-600 bg-gray-700 bg-opacity-40 shadow-md rounded-lg">
    {children}
  </div>
);
