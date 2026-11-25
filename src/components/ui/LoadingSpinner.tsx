import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-9 h-9 border-4',
  lg: 'w-14 h-14 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullPage = false,
  size = 'md',
}) => {
  const spinner = (
    <div
      className={`${sizeMap[size]} rounded-full animate-spin`}
      style={{
        borderColor: 'rgba(244,123,53,0.25)',
        borderTopColor: '#F47B35',
      }}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(23,25,28,0.5)', backdropFilter: 'blur(4px)' }}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
