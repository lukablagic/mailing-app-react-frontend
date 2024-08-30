import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/Register";
import Home from "./pages/home/Home";
import { AuthContext } from "./utility/contexts/AuthContext";

export const App = () => {

  const { auth, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const storedToken                                   = sessionStorage.getItem("token");

  useEffect(() => {
    if (storedToken !== undefined && storedToken !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function AuthGuard({ children }) {
    if (typeof auth !== 'undefined' && isAuthenticated === true && Object.keys(auth).length > 0) {
      return children;
    } else {
      return <Navigate to="/app/login" />;
    }
  }

  function UnAuthGuard({ children }) {
    if (typeof auth !== 'undefined' && isAuthenticated === true && Object.keys(auth).length > 0) {
      return <Navigate to="/app/mail/inbox" />;
    } else {
      return children;
    }
  }

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/app/*" element={<AuthGuard><Home /></AuthGuard>} />
          <Route path="/app/register" element={<UnAuthGuard><Register /></UnAuthGuard>} />
          <Route path="/app/login" element={<UnAuthGuard><Login /></UnAuthGuard>} />
          <Route path="*" element={<AuthGuard>{false}</AuthGuard> } />
        </Routes>
      </BrowserRouter>
    </>
  );
};
