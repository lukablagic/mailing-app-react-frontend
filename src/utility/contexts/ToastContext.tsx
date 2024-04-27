import  { createContext, useState } from "react";
import { Toast } from "../../components/toast/Toast";

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message, position = "top-center", duration = 1000) => {
    const id = Math.random().toString(36).slice(4, 9);
    setToasts((oldToasts) => [...oldToasts, { id, type, message, position }]);

    setTimeout(() => {
      setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value = {{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key = {toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };