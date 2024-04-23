import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../utility/contexts/AuthContext";
import { ToastContext } from "../utility/contexts/ToastContext";

export const Register = ({ }) => {

  const { setAuth, setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData]         = useState({ name: '', surname: '', email: '', password: '' });
  const { showToast }                    = useContext(ToastContext);
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost/api/auth/register', formData);
    console.log(response);
    if (response.status === 200) {
      const { auth } = response.data;
      setAuth(auth);
      setIsAuthenticated(true);
      showToast('success', 'Registration successful');
    } else {
      showToast('error', 'Invalid credentials');
    }
  };

  return (
    <div className="h-full w-full bg-teal-50 flex items-csenter justify-center">
      <div className="flex flex-row h-max-h-screen w-full justify-end items-right gap-4">
        <div className="w-4/12 flex justify-end h-full ">
          <div className="mb-24 flex flex-col items-left grow-1 shrink-1 justify-center gap-4 ">
            <h1 className="text-4xl font-bold text-sky-400">Dev Mail</h1>
            <h1 className="text-gray-500">Welcome, please register for a new account.</h1>
            <h2 className="text-xl font-bold  ">Register</h2>
            <p className=" my-2 text-black">
              Already have an account? <Link className="text-cyan-500 hover:text-cyan-800" to="/login">Login</Link>
            </p>
            <form className="flex flex-col gap-3 " onSubmit={handleRegister}>
              <label className="block text-gray-700 text-sm font-bold ">
                Name
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" placeholder="Enter name" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm font-bold ">
                Surname
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="surname" placeholder="Enter surname" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm font-bold ">
                Email address
                <input className="shadow border appearance-none rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Enter email" onChange={handleInputChange} />
              </label>
              <label className="block text-gray-700 text-sm font-bold ">
                Password
                <input className="shadow appearance-none border rounded w-full py-2 px-2 leading-tight focus:outline-none focus:shadow-outline text-gray-700" name="password" type="password" placeholder="Password" onChange={handleInputChange} />
              </label>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
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