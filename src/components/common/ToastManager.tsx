// ToastManager.tsx
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastData {
  id: number;
  type: "success" | "error";
  message: string;
}
interface Props {
  addToast: (type: "success" | "error", message: string) => void;
}
function ToastManager() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const newToast: ToastData = {
      id: Date.now(),
      type,
      message,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          bg={toast.type === "success" ? "success" : "danger"}
          show={true}
          onClose={() => removeToast(toast.id)}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {toast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default ToastManager;
