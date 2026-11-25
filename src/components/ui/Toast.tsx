import React, { useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig {
  icon: React.ReactNode;
  borderColor: string;
  iconColor: string;
  bg: string;
}

const toastConfig: Record<ToastType, ToastConfig> = {
  success: {
    icon: <CheckCircle size={18} />,
    borderColor: '#22c55e',
    iconColor: '#22c55e',
    bg: '#FFFFFF',
  },
  error: {
    icon: <XCircle size={18} />,
    borderColor: '#EF4444',
    iconColor: '#EF4444',
    bg: '#FFFFFF',
  },
  info: {
    icon: <Info size={18} />,
    borderColor: '#3B82F6',
    iconColor: '#3B82F6',
    bg: '#FFFFFF',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    borderColor: '#F59E0B',
    iconColor: '#F59E0B',
    bg: '#FFFFFF',
  },
};

interface SingleToastProps {
  id: string;
  type: ToastType;
  message: string;
  onDismiss: (id: string) => void;
}

const SingleToast: React.FC<SingleToastProps> = ({ id, type, message, onDismiss }) => {
  const cfg = toastConfig[type];
  const ref = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(40px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    });
  }, []);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className="flex items-start gap-3 rounded-xl shadow-lg px-4 py-3 min-w-[260px] max-w-[340px]"
      style={{
        backgroundColor: cfg.bg,
        borderLeft: `4px solid ${cfg.borderColor}`,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <span style={{ color: cfg.iconColor, flexShrink: 0, marginTop: 1 }}>
        {cfg.icon}
      </span>
      <p className="flex-1 text-sm font-medium leading-snug" style={{ color: '#17191C' }}>
        {message}
      </p>
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 rounded p-0.5 transition-opacity duration-150 hover:opacity-70 focus:outline-none"
        aria-label="Dismiss notification"
        style={{ color: '#777D85' }}
      >
        <X size={15} />
      </button>
    </div>
  );
};

const Toast: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-50 flex flex-col gap-2"
      style={{
        // Desktop: bottom-right; Mobile: bottom-center handled via CSS below
        bottom: '1.25rem',
        right: '1.25rem',
      }}
    >
      <style>{`
        @media (max-width: 639px) {
          .toast-container {
            right: 50% !important;
            transform: translateX(50%);
          }
        }
      `}</style>
      <div className="toast-container flex flex-col gap-2">
        {toasts.map((t) => (
          <SingleToast
            key={t.id}
            id={t.id}
            type={t.type as ToastType}
            message={t.message}
            onDismiss={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Toast;
