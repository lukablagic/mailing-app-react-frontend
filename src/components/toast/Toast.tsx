import { useEffect, useRef } from 'react';
import './assets/styles.css';

export const Toast = ({ message, type }) => {
    const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (toastRef.current) {
        toastRef.current.classList.add('fade-out');
      }
    };
  }, []);

  return (
    <div ref={toastRef} className={`toast toast-${type}`}>
      {message}
    </div>
  );
};