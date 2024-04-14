import React, { createContext, useState } from 'react';


 const ToastContext = createContext({
  showToast: (type:string, message: string) => {},
  hideToast: () => {},
});

function ToastProvider ({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
    const showToast = (type, message) => {
        setType(type);
      setMessage(message);
        setIsOpen(true);
    };
  
    const hideToast = () => {
      setIsOpen(false);
    };
  
    return (
      <ToastContext.Provider value={{ showToast, hideToast }}>
        {children}      
      </ToastContext.Provider>
);
  }
  

export { ToastContext, ToastProvider };
