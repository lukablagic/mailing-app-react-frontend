import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/Register";
import Home from "./pages/home/Home";
import { AuthContext } from "./utility/contexts/AuthContext";

const App = () => {

  const storedToken = sessionStorage.getItem("token");
  const { auth, setAuth, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (storedToken !== undefined && storedToken !== null) {
      setAuth({ token: storedToken });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function AuthGuard({ children }) {
    if (Object.keys(auth).length > 0) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function UnAuthGuard({ children }) {
    if (Object.keys(auth).length > 0) {
      return <Navigate to="/app/mail/inbox" />;
    } else {
      return children;
    }
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/app/*" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="register" element={<UnAuthGuard><Register /></UnAuthGuard>} />
        <Route path="login" element={<UnAuthGuard><Login /></UnAuthGuard>} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
