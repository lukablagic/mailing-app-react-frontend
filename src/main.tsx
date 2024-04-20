import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./utility/contexts/ToastContext";
import { AuthProvider } from "./utility/contexts/AuthContext";
import { ThreadProvider } from "./utility/contexts/ThreadContext";
import "./index.css";
import TabsProvider from "./utility/contexts/TabsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <ThreadProvider>
        <AuthProvider>
          <TabsProvider>
            <App />
          </TabsProvider>
        </AuthProvider>
      </ThreadProvider>
    </ToastProvider>
  </React.StrictMode>,
);
