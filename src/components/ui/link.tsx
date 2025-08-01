import React, { forwardRef } from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: "primary" | "secondary" | "accent" | "cream";
  hoverColor?: "primary" | "secondary" | "accent" | "cream" | "complementary";
}

export const StyledLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      color = "cream",
      hoverColor = "complementary",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const colorClasses: Record<string, string> = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      cream: "text-cream",
    };

    const hoverClasses: Record<string, string> = {
      primary: "hover:text-primary",
      secondary: "hover:text-secondary",
      accent: "hover:text-accent",
      cream: "hover:text-cream",
      complementary: "hover:text-complementary",
    };

    const computedHoverClass = hoverColor ? hoverClasses[hoverColor] : "";

    return (
      <a
        ref={ref}
        className={`inline-flex items-center focus:outline-none ${colorClasses[color]} ${computedHoverClass} ${className}`}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="ml-1">
          &rarr;
        </span>
      </a>
    );
  }
);

StyledLink.displayName = "StyledLink";

export default StyledLink;
