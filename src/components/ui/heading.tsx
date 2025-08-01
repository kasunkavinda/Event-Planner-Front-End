import React, { JSX } from "react";

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "cream"
    | "black"
    | "white"
    | "red"
    | "complementary";
  hoverColor?: "primary" | "secondary" | "accent" | "cream";
  className?: string;
  align?: "left" | "center" | "right";
}

const Heading: React.FC<HeadingProps> = ({
  level = 5,
  color = "complementary",
  hoverColor,
  className = "",
  children,
  align = "left",
  ...props
}) => {
  const sizeMapping: Record<number, string> = {
    1: "text-5xl",
    2: "text-4xl",
    3: "text-3xl",
    4: "text-2xl",
    5: "text-xl",
    6: "text-lg",
  };

  const colorMapping: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    cream: "text-cream",
    black: "text-black",
    white: "text-white",
    red: "text-red-400",
    complementary: "text-complementary",
  };

  const hoverMapping: Record<string, string> = {
    primary: "hover:text-primary",
    secondary: "hover:text-secondary",
    accent: "hover:text-accent",
    cream: "hover:text-cream",
    black: "hover:text-black",
    white: "hover:text-white",
  };

  const alignMapping: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const classes = `${
    sizeMapping[level]
  } font-heading tracking-tight font-bold ${colorMapping[color] || ""} ${
    hoverColor ? hoverMapping[hoverColor] : ""
  } ${alignMapping[align]}  ${className}`.trim();

  return React.createElement(Tag, { className: classes, ...props }, children);
};

export default Heading;
