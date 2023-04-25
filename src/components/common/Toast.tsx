import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast">
      <div className="toast-message">{message}</div>
      <button className="toast-close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Toast;
