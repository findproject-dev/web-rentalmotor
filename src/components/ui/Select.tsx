import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...rest }, ref) => {
    const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(error);
    const borderColor = hasError ? '#EF4444' : '#D1D5DB';

    return (
      <div
        className={`flex flex-col gap-1 ${className}`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-semibold"
            style={{ color: '#17191C' }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={[
              'w-full appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm',
              'transition-all duration-200 outline-none cursor-pointer',
              'focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'dark:bg-[#22252A] dark:text-white',
            ].join(' ')}
            style={{
              borderColor,
              color: '#17191C',
              backgroundColor: '#FFFFFF',
              // @ts-ignore
              '--tw-ring-color': hasError ? '#EF4444' : '#F47B35',
            } as React.CSSProperties}
            aria-invalid={hasError}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...rest}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom chevron */}
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: '#777D85' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-xs font-medium"
            style={{ color: '#EF4444' }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
