import React, { forwardRef } from "react";
import { disabledStyle } from "../../consts/util-consts";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "cream"
    | "complementary"
    | "ghost";
  size?: "exSmall" | "small" | "medium" | "large" | "exlarge";
  bgHover?: "primary" | "secondary" | "accent" | "cream";
  icon?: React.ReactNode;
  fullRounded?: boolean;
  disabled?: boolean;
  isPending?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      bgColor = "complementary",
      size = "medium",
      bgHover = "accent",
      icon,
      fullRounded = false,
      className = "",
      children,
      disabled = false,
      isPending = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses: Record<string, string> = {
      exSmall: "px-1 text-xs",
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
      exlarge: "px-8 py-4 text-xl",
    };

    const colorClasses: Record<string, string> = {
      primary: "bg-primary text-complementary",
      secondary: "bg-secondary text-complementary",
      accent: "bg-accent text-black",
      cream: "bg-cream text-black",
      complementary: "bg-complementary text-primary",
      ghost: " bg-transparent text-complementary",
    };

    const hoverClasses: Record<string, string> = {
      primary: "hover:bg-primary",
      secondary: "hover:bg-secondary hover:text-complementary",
      accent: "hover:bg-accent hover:text-complementary",
      cream: "hover:bg-cream",
      complementary: "hover:bg-complementary hover:text-primary",
    };

    const disabledClasses = disabled ? disabledStyle : "";

    const computedHoverClass =
      !disabled && bgHover ? hoverClasses[bgHover] : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`btn inline-flex items-center focus:outline-none ${
          colorClasses[bgColor]
        } ${sizeClasses[size]} ${
          fullRounded ? "rounded-full" : "rounded"
        } ${computedHoverClass} ${disabledClasses} ${className}`}
        {...props}
      >
        {isPending ? (
          <div className="w-full flex justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {icon && <span className="mr-1">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
