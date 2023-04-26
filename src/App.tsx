import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import { LoginData } from "./models/LoginData";
import {ToastContext, ToastProvider} from "./components/common/ToastContext";
//import AuthGuard from "./guard/AuthGuard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, password) => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  function AuthGuard({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
  }

  function useAuth() {
    return isLoggedIn;
  }
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route path="register" element={<Register onRegister={login} />} />
          <Route path="login" element={<Login onLogin={login} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};



export default App;
