import React, { createContext, useState, useContext } from "react";
import { Toast } from "../../components/toast/Toast";

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toastData, setToastData] = useState(null);

  const showToast = (type, message, position = "top-center") => {
    setToastData({ type, message, position });
  };

  const hideToast = () => {
    setToastData(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastData && <Toast {...toastData} />}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };