import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Home from "./pages/home/Home";
import { AuthContext } from "./utility/contexts/AuthContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedToken = localStorage.getItem("token");
  const { auth, setAuth, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
      setAuth(true);
    } else {
      setToken(null);
      setAuth(false);
    }
  }, [setAuth, setToken, storedToken]);

  function AuthGuard({ children }) {
    if (auth) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function UnAuthGuard({ children }) {
    if (auth) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  }

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
          <Route path="register" element={<UnAuthGuard><Register /></UnAuthGuard>} />
          <Route path="login" element={<UnAuthGuard><Login /></UnAuthGuard>} />
        </Routes>
      </BrowserRouter>

  );
};

export default App;
