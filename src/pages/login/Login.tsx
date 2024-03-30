import React, { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../../api/Auth";
import { ToastContext } from "../../utility/contexts/ToastContext";
import { AuthContext } from "../../utility/contexts/AuthContext";
import axios from "axios";

export const Login = ({ }) => {

  const { showToast } = useContext(ToastContext);
  const { setAuth, setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(`/`);
  };

  const navigateToRegister = () => {
    navigate(`/register`);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
      const response = await axios.post('http://localhost/api/auth/login', { email, password });
  };

  return (
    <div className="h-full w-full bg-teal-50 flex items-csenter justify-center">
      <div className="flex flex-row h-max-h-screen w-full justify-end items-right gap-4">
        <div className="w-4/12 flex justify-end h-full ">
          <div className="mb-24 flex flex-col items-left grow-1 shrink-1 justify-center gap-4 ">
            <h1 className="text-4xl font-bold text-sky-400">Dev Mail</h1>
            <h1 className="text-gray-500">Welcome back, please login to your account.</h1>
            <h2 className="text-xl font-bold  ">Login</h2>
            <p className=" my-2 text-black">
              Don't have an account yet? <Link className="text-cyan-500 hover:text-cyan-800" to="/register">Register</Link>
            </p>
            <form className="flex flex-col gap-3 ">
              <label className="block text-gray-700 text-sm font-bold " htmlFor="email">
                Email address
              </label>
              <input
                className="shadow  border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="flex flex-row justify-between items-center">
                <label className="block  font-bold  text-gray-700" htmlFor="password">
                  Password
                </label>
                <a className="text-cyan-500 hover:text-cyan-800 " href="#">
                  Forgot Password?
                </a>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-2  leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </form>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="remember">
                <input className="mr-2 leading-tight" type="checkbox" id="remember" />
                <span className="text-sm">
                  Remember me
                </span>
              </label>
            </div>
            <button onClick={handleLogin} className="w-full bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </div>
        </div>
        <div className="w-1/2 mx-auto">
          <img src="src\assets\images\login-mobile-testing.svg" alt="Team development image" />
        </div>
      </div>
    </div >
  );
};
