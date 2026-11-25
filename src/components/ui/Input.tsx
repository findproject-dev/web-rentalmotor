import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, ...rest }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);

    const borderColor = hasError ? '#EF4444' : '#D1D5DB';
    const focusRingColor = hasError ? '#EF4444' : '#F47B35';

    return (
      <div className={`flex flex-col gap-1 ${className}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold"
            style={{ color: '#17191C' }}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <span
              className="absolute left-3 flex items-center pointer-events-none"
              style={{ color: '#777D85' }}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-xl border px-4 py-2.5 text-sm',
              'transition-all duration-200 outline-none',
              'focus:ring-2 focus:ring-offset-0',
              'placeholder:text-gray-400',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'dark:bg-[#22252A] dark:text-white dark:placeholder:text-gray-500',
              icon ? 'pl-10' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              borderColor,
              color: '#17191C',
              backgroundColor: '#FFFFFF',
              // @ts-ignore CSS custom property
              '--tw-ring-color': focusRingColor,
            } as React.CSSProperties}
            aria-invalid={hasError}
            aria-describedby={
              [
                error ? `${inputId}-error` : null,
                hint ? `${inputId}-hint` : null,
              ]
                .filter(Boolean)
                .join(' ') || undefined
            }
            {...rest}
          />
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs font-medium"
            style={{ color: '#EF4444' }}
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-xs"
            style={{ color: '#777D85' }}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
