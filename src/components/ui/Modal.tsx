import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  // Scroll lock + keyboard listener
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(23,25,28,0.7)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]`}
        style={{
          backgroundColor: '#FFFFFF',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animation: 'modal-in 0.2s ease-out both',
        }}
      >
        {/* Header */}
        {(title !== undefined) && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: '#E5E7EB' }}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold"
                style={{ color: '#17191C' }}
              >
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="ml-auto flex items-center justify-center rounded-lg p-1.5 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2"
              aria-label="Close modal"
              style={{ color: '#777D85' }}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Close button when no title */}
        {title === undefined && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center rounded-lg p-1.5 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 z-10"
            aria-label="Close modal"
            style={{ color: '#777D85' }}
          >
            <X size={20} />
          </button>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Modal;
