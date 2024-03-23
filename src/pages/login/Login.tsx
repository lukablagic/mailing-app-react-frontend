import React, { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../../api/Auth";
import { ToastContext } from "../../utility/contexts/ToastContext";
import { AuthContext } from "../../utility/contexts/AuthContext";
import { getUserData } from "../../api/User";

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
    <div className="h-full w-full bg-teal-50 flex items-center justify-center">
      <div className="flex flex-row justify-start items-center gap-4 w-full">
        <div className=" w-6/12 h-2/3 m-16 p-12 border border-teal-100 rounded-xl">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className=" my-2 text-black">
            Create account  <Link className="text-blue-500 hover:text-blue-800" to="/register">Register</Link>
          </p>
          <form onSubmit={handleLogin}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="shadow  border appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2  text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-gray-700"
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
        </div>
        <div className="w-full h-full p-16">
          <img src="src\assets\images\login-mobile-testing.svg" alt="Team development image" />
        </div>
      </div>
    </div>
  );
};
