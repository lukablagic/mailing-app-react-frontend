import React, { createContext, useState } from 'react';
import { Toast } from 'react-bootstrap';


 const ToastContext = createContext({
  showToast: (message: string) => {},
  hideToast: () => {},
});

function ToastProvider(props) {
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
        {props.children}
        <Toast show={isOpen} onClose={hideToast} delay={3000} autohide>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContext.Provider>
    );
  }
  

export { ToastContext, ToastProvider };
