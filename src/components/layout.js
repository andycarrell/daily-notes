import React from "react";

export const Page = ({ children }) => (
  <div className="bg-gray-800 min-h-screen">{children}</div>
);

export const Layout = ({ children }) => (
  <div className="h-full flex flex-col items-center px-4 sm:px-0 pt-12 sm:pt-[25vh]">
    {children}
  </div>
);

export const Card = ({ children }) => (
  <div className="max-w-xl w-full border-2 border-gray-600 bg-gray-700 bg-opacity-40 shadow-md rounded-lg px-4 pb-4 sm:px-5 sm:pb-5 pt-2 sm:pt-5">
    {children}
  </div>
);
