import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../utility/contexts/AuthContext";
import { ToastContext } from "../utility/contexts/ToastContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const Register = ({ }) => {

  const { setAuth, setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData]         = useState({ name: '', surname: '', email: '', password: '', code: '', uid: ''});
  const { showToast }                   = useContext(ToastContext);
  const navigate                        = useNavigate();
    
  useEffect(() => {
          document.title = 'Dev Mail - Register';
    const urlParams      = new URLSearchParams(window.location.search);
    const code           = urlParams.get('code');
    const uid            = urlParams.get('uid');
    if (code && uid) {
      formData.code = code;
      formData.uid  = uid;
    }
    setFormData(formData);
  }, []);
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      const { auth } = response.data;
      if (response.status === 200) {
        setAuth(auth);
        setIsAuthenticated(true);
        showToast('success', 'Registration successful');
        navigate('app/login');
      }
  
    } catch (error) {
      if (error.response) {
        showToast('error', error.response.data.message);
      } else if (error.request) {
        showToast('error', 'No response received from server. Please try again.');
      } else {
        showToast('error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="h-full w-full bg-teal-50 flex items-csenter justify-center">
      <div className="flex flex-row h-max-h-screen w-full justify-end items-right gap-4">
        <div className="w-4/12 flex justify-end h-full ">
          <div className="mb-24 flex flex-col items-left grow-1 shrink-1 justify-center gap-4 ">
            <h1 className="text-4xl font-bold text-sky-400">Dev Mail</h1>
            <h1 className="text-gray-500">Welcome, please register for a new account.</h1>
            <h2 className="text-xl font-bold">Register</h2>
            <p className=" my-2 text-black">
              Already have an account? <Link className="text-cyan-500 hover:text-cyan-800" to="/login">Login</Link>
            </p>
            <form className="flex flex-col gap-3 " onSubmit={handleRegister}>
              <label className="block text-gray-700 text-sm ">
                Name
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" placeholder="Enter name" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm ">
                Surname
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="surname" placeholder="Enter surname" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm ">
                Email address
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Enter email" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm ">
                Password
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  pattern="(?=.*\W).{8,}"
                  title="Password must be at least 8 characters long and one special character."
                />
              </label>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 mx-auto">
          <img src="../src/assets/images/login-mobile-testing.svg" alt="Team development image" />
        </div>
      </div>
    </div>
  );
};