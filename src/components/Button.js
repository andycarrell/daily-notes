import React from "react";

const buttonClassName = (c) =>
  `cursor-pointer flex justify-center items-center rounded-md transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${c}`.trim();
const iconGrayClassName = (c) =>
  "text-gray-400 hover:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300 [&_svg]:h-8 [&_svg]:w-8";

const Button = ({ className, children, ...rest }) => (
  <button className={buttonClassName(className)} {...rest}>
    {children}
  </button>
);

export const Link = ({ className, children, ...rest }) => (
  <a className={buttonClassName(className)} {...rest}>
    {children}
  </a>
);

export const IconGrayLink = (props) => (
  <Link className={iconGrayClassName()} {...props} />
);

export const IconGrayButton = (props) => (
  <Button className={iconGrayClassName()} {...props} />
);

export default Button;
