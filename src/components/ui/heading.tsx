import React, { JSX } from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'cream'
    | 'black'
    | 'white'
    | 'red'
    | 'complementary';
  hoverColor?: 'primary' | 'secondary' | 'accent' | 'cream';
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const Heading: React.FC<HeadingProps> = ({
  level = 5,
  color = 'complementary',
  hoverColor,
  className = '',
  children,
  align = 'left',
  ...props
}) => {
  // Map heading levels to default text sizes (adjust as needed)
  const sizeMapping: Record<number, string> = {
    1: 'text-5xl',
    2: 'text-4xl',
    3: 'text-3xl',
    4: 'text-2xl',
    5: 'text-xl',
    6: 'text-lg',
  };

  // Mapping for text colors (make sure these classes exist in your Tailwind config)
  const colorMapping: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    cream: 'text-cream',
    black: 'text-black',
    white: 'text-white',
    red: 'text-red-400',
    complementary: 'text-complementary',
  };

  // Mapping for hover text colors
  const hoverMapping: Record<string, string> = {
    primary: 'hover:text-primary',
    secondary: 'hover:text-secondary',
    accent: 'hover:text-accent',
    cream: 'hover:text-cream',
    black: 'hover:text-black',
    white: 'hover:text-white',
  };

  // Mapping for text alignment
  const alignMapping: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Determine which tag to render (h1, h2, etc.)
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Build the class string. font-heading is always included.
  const classes = `${
    sizeMapping[level]
  } font-heading tracking-tight font-bold ${colorMapping[color] || ''} ${
    hoverColor ? hoverMapping[hoverColor] : ''
  } ${alignMapping[align]}  ${className}`.trim();

  return React.createElement(Tag, { className: classes, ...props }, children);
};

export default Heading;
