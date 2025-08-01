import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  bgColor?: 'primary' | 'secondary' | 'accent' | 'cream' | 'complementary';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'accent' | 'cream' | 'complementary';
  fullRounded?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  bgColor = 'cream',
  color = 'primary',
  size = 'small',
  fullRounded = false,
  icon,
  className = '',
  children,
  ...props
}) => {
  const sizeClasses: Record<string, string> = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  };

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary text-complementary',
    secondary: 'bg-secondary text-complementary',
    accent: 'bg-accent text-black',
    cream: 'bg-cream text-black',
    complementary: 'bg-complementary text-primary',
  };

  const textColorClasses: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    cream: 'text-cream',
    complementary: 'text-complementary',
  };

  return (
    <span
      className={`inline-flex items-center border-primary ${
        colorClasses[bgColor]
      } ${sizeClasses[size]} ${textColorClasses[color]}  ${
        fullRounded ? 'rounded-full' : 'rounded'
      } font-medium ${className}`}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
