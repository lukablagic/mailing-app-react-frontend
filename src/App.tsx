import * as React from "react";
import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";
import { LoginData } from "./models/LoginData";
import {ToastContext, ToastProvider} from "./components/common/ToastContext";
import { AuthContext } from "./components/common/AuthContext";
//import AuthGuard from "./guard/AuthGuard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {auth,setAuth,setToken} = useContext(AuthContext);
  const storedToken = localStorage.getItem('token');


  function AuthGuard({ children }) {
    console.log(storedToken)
    if (storedToken) {
      setToken(storedToken);
      setAuth(true);
      return auth ? children : <Navigate to="/" />;
    }
    return auth ? children : <Navigate to="/login" />;
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
          <Route path="register" element={<Register  />} />
          <Route path="login" element={<Login  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};



export default App;


