import React from "react";

export const Page = ({ children }) => (
  <div className="bg-gray-800 min-h-screen">{children}</div>
);

export const Layout = ({ children }) => (
  <div className="h-full max-w-xl mx-auto flex flex-col items-center px-4 sm:px-0 pt-12 sm:pt-[16vh]">
    {children}
  </div>
);

export const Card = ({ children }) => (
  <div className="w-full border-2 border-gray-600 bg-gray-700 bg-opacity-40 shadow-md rounded-lg p-0 sm:p-5">
    {children}
  </div>
);
