import React from "react";

const Button = ({ className, children, ...rest }) => (
  <button
    className={`cursor-pointer flex justify-center items-center rounded-md transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
