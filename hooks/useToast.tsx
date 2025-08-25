
import React, { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Toast from '../components/Toast';

type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

type ToastContextType = {
  showToast: (message: string, type: 'success' | 'error') => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = toastId++;
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 2500);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  const portalElement = typeof window !== 'undefined' ? document.getElementById('toast-portal') : null;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {portalElement && ReactDOM.createPortal(
        <div className="fixed top-5 right-5 z-50 space-y-2">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>,
        portalElement
      )}
    </ToastContext.Provider>
  );
};
