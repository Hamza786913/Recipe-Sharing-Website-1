import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ToastContextType {
  showToast: (msg: string, duration?: number) => void;
  toastMsg: string;
  toastVisible: boolean;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string, duration = 3000) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toastMsg, toastVisible }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}