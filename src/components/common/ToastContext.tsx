import React, { createContext, useState } from 'react';
import { Toast } from 'react-bootstrap';


 const ToastContext = createContext({
  showToast: (message: string) => {},
  hideToast: () => {},
});

function ToastProvider ({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
  
    const showToast = (message) => {
      setIsOpen(true);
      setMessage(message);
    };
  
    const hideToast = () => {
      setIsOpen(false);
    };
  
    return (
      <ToastContext.Provider value={{ showToast, hideToast }}>
       
        <div className='toast-container'>
        <Toast className="d-inline-block m-1" bg='success' show={isOpen} onClose={hideToast} delay={3000} autohide>
          <Toast.Header></Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
        {children}      
      </ToastContext.Provider>
);
  }
  

export { ToastContext, ToastProvider };
