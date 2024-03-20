import React, { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../api/Auth";
import { ToastContext } from "../utility/contexts/ToastContext";
import { AuthContext } from "../utility/contexts/AuthContext";
import { getUserData } from "../api/User";

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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {


      const token = await loginUser(email, password);
      setAuth(true);
      setToken(token);
      sessionStorage.setItem("token", token);
      setUser(getUserData(token));
      const userData = await getUserData(token);
      sessionStorage.setItem("user", JSON.stringify(userData));
      showToast("success", 'Login successful!');
      navigateToHome();
    } catch (error) {
      console.error(error);
      showToast("success", 'Login failed!');
    }
  };

  return (
    <div className="container w-64 my-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Login
        </button>
      </form>

      <p className="mt-4">
        Don't have an account?
        <Link className="text-blue-500 hover:text-blue-800" to="/register">Register</Link>
      </p>
    </div>
  );
};
