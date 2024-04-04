import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/Auth";
import { ToastContext } from "../../utility/contexts/ToastContext";
import { AuthContext } from "../../utility/contexts/AuthContext";
import axios from "axios";

export const Login = ({}) => {
  
  const { showToast } = useContext(ToastContext);
  const { setAuth, setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(`/`);
  };

  const navigateToRegister = () => {
    navigate(`/register`);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost/api/auth/login", {
      email,
      password,
    });
    if (response.status === 200) {
      const { user, token } = response.data;
      setAuth(true);
      sessionStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      navigateToHome();
    } else {
      showToast("error", "Invalid credentials");
    }
  };

  return (
    <div className="items-csenter flex h-full w-full justify-center bg-teal-50">
      <div className="h-max-h-screen items-right flex w-full flex-row justify-end gap-4">
        <div className="flex h-full w-4/12 justify-end ">
          <div className="items-left grow-1 shrink-1 mb-24 flex flex-col justify-center gap-4 ">
            <h1 className="text-4xl font-bold text-sky-400">Dev Mail</h1>
            <h1 className="text-gray-500">
              Welcome back, please login to your account.
            </h1>
            <h2 className="text-xl font-bold  ">Login</h2>
            <p className=" my-2 text-black">
              Don't have an account yet?{" "}
              <Link
                className="text-cyan-500 hover:text-cyan-800"
                to="/register"
              >
                Register
              </Link>
            </p>
            <form className="flex flex-col gap-3 ">
              <label
                className="block text-sm font-bold text-gray-700 "
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="focus:shadow-outline  w-full appearance-none rounded border px-2 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className="flex flex-row items-center justify-between">
                <label
                  className="block  font-bold  text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <a className="text-cyan-500 hover:text-cyan-800 " href="#">
                  Forgot Password?
                </a>
              </div>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-2 py-2  leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </form>
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="remember"
              >
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="remember"
                />
                <span className="text-sm">Remember me</span>
              </label>
            </div>
            <button
              onClick={handleLogin}
              className="focus:shadow-outline w-full rounded bg-cyan-400 px-4 py-2 font-bold text-white hover:bg-cyan-600 focus:outline-none"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
        <div className="mx-auto w-1/2">
          <img
            src="../src/assets/images/login-mobile-testing.svg"
            alt="Team development image"
          />
        </div>
      </div>
    </div>
  );
};