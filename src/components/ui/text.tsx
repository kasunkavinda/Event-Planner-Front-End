import React, { ElementType } from "react";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "complementary"
    | "cream"
    | "white"
    | "black"
    | "gray"
    | "red"
    | "blue"
    | "green";
  hoverColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "cream"
    | "white"
    | "black"
    | "gray"
    | "red"
    | "blue"
    | "green";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  strikethrough?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

const Text: React.FC<TextProps> = ({
  as: Element = "p",
  size = "sm",
  color = "white",
  hoverColor,
  weight = "normal",
  strikethrough = false,
  align = "left",
  className = "",
  children,
  ...props
}) => {
  const sizeClasses: Record<string, string> = {
    "2xs": "text-2xs",
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  const colorClasses: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    cream: "text-cream",
    complementary: "text-complementary",
    white: "text-white",
    black: "text-black",
    gray: "text-gray-600",
    red: "text-red-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  const hoverClasses: Record<string, string> = {
    primary: "hover:text-primary",
    secondary: "hover:text-secondary",
    accent: "hover:text-accent",
    cream: "hover:text-cream",
    white: "hover:text-white",
    black: "hover:text-black",
    gray: "hover:text-gray-700",
    red: "hover:text-red-700",
    blue: "hover:text-blue-700",
    green: "hover:text-green-700",
  };

  const weightClasses: Record<string, string> = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  const alignClasses: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const finalSizeClasses = sizeClasses[size] || sizeClasses.base;
  const finalColorClasses = colorClasses[color] || colorClasses.black;
  const finalHoverClasses = hoverColor ? hoverClasses[hoverColor] : "";
  const finalWeightClasses = weightClasses[weight] || weightClasses.normal;
  const finalAlignClasses = alignClasses[align] || alignClasses.left;

  const strikethroughClass = strikethrough ? "line-through" : "";

  const classes = `${finalSizeClasses} ${finalColorClasses} ${finalHoverClasses} ${finalWeightClasses} ${finalAlignClasses} ${strikethroughClass} ${className}`;

  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

export default Text;
