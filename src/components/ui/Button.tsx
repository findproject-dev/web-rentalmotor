import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#F47B35',
    color: '#FFFFFF',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#17191C',
    color: '#FFFFFF',
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#F47B35',
    border: '2px solid #F47B35',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#777D85',
    border: 'none',
  },
};

const variantHoverClass: Record<ButtonVariant, string> = {
  primary: 'hover-primary',
  secondary: 'hover-secondary',
  outline: 'hover-outline',
  ghost: 'hover-ghost',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
};

const Spinner: React.FC<{ size: ButtonSize }> = ({ size }) => {
  const dim = size === 'sm' ? 14 : size === 'md' ? 16 : 20;
  return (
    <svg
      className="animate-spin"
      style={{ width: dim, height: dim }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  disabled = false,
  className = '',
  type = 'button',
  loading = false,
  icon,
}) => {
  const isDisabled = disabled || loading;

  const baseClass = [
    'inline-flex items-center justify-center',
    'rounded-xl font-semibold',
    'transition-all duration-200',
    'cursor-pointer select-none',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    sizeClasses[size],
    isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    ...variantStyles[variant],
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  const content = (
    <>
      {loading && <Spinner size={size} />}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </>
  );

  if (href && !isDisabled) {
    return (
      <a
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={baseClass}
        style={style}
        aria-disabled={isDisabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={isDisabled}
      className={baseClass}
      style={style}
      aria-busy={loading}
    >
      {content}
    </button>
  );
};

export default Button;
