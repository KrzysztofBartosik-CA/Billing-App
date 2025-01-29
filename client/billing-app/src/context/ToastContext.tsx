import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  showToast: (severity: 'success' | 'info' | 'warning' | 'error', message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'warning' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showToast = useCallback((severity: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setToast({ open: true, message, severity });
  }, []);

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        severity={toast.severity}
        open={toast.open}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};