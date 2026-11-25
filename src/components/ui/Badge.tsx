import React from 'react';

type BadgeVariant = 'orange' | 'dark' | 'green' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  orange: {
    backgroundColor: 'rgba(244, 123, 53, 0.15)',
    color: '#F47B35',
  },
  dark: {
    backgroundColor: '#17191C',
    color: '#FFFFFF',
  },
  green: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: '#16a34a',
  },
  gray: {
    backgroundColor: 'rgba(119, 125, 133, 0.15)',
    color: '#777D85',
  },
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'orange',
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight ${className}`}
      style={{
        ...variantStyles[variant],
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
