import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import Home from "./components/Test";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {LoginData} from "./models/LoginData";
import Home from "./components/home/Home";
export const useLoginData = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });

  const handleLogin = (email, password) => {
    setLoginData({ email, password });
  };
  return { loginData, handleLogin };
};
const App = () => {

  const {loginData }= useLoginData();


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
          <Route path="/" element={<Home loginData={loginData} />} /> 
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login  />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
