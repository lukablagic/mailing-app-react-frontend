import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/Auth";
import { ToastContext } from "../utility/contexts/ToastContext";
import { AuthContext } from "../utility/contexts/AuthContext";

export const Register = () => {
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { setAuth } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !surname || !email || !password) {
            showToast("warning", 'Please fill in all fields');
            return;
        }
        try {
            const data = await registerUser({ name, surname, email, password });
            if (data) {
                setAuth(true);
                showToast("success", 'Registration successful!');
                navigate('/login');
            } else {
                showToast("danger", 'Registration failed!');
            }
        } catch (error) {
            console.error(error);
            showToast("danger", 'Registration failed!');
        }
    };


    const navigateToLogin = () => {
        navigate(`/login`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="container w-64 ">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                            Surname
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="surname"
                            type="surname"
                            placeholder="Enter Surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>

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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-black">
                    Registered? <Link className="text-blue-500 hover:text-blue-800" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};
