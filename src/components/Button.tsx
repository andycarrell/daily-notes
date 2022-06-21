import React from "react";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}
interface LinkProps extends ComponentProps<"a"> {}

const appendAndTrim = (base: string, append?: string) =>
  `${base} ${append || ""}`.trim();

const buttonClassName = (c?: string) =>
  appendAndTrim(
    "cursor-pointer flex justify-center items-center rounded-md transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70",
    c
  );
const iconGrayClassName = () =>
  "text-gray-400 hover:text-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300 [&_svg]:h-8 [&_svg]:w-8";

const Button = ({ className, children, ...rest }: ButtonProps) => (
  <button className={buttonClassName(className)} {...rest}>
    {children}
  </button>
);

export const Link = ({ className, children, ...rest }: LinkProps) => (
  <a className={buttonClassName(className)} {...rest}>
    {children}
  </a>
);

export const IconGrayLink = (props: Omit<LinkProps, "className">) => (
  <Link className={iconGrayClassName()} {...props} />
);

export const IconGrayButton = (props: Omit<ButtonProps, "className">) => (
  <Button className={iconGrayClassName()} {...props} />
);

export default Button;
