import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import { registerUser } from "../../api/Auth";
import { ToastContext } from "../common/ToastContext";
import { AuthContext } from "../common/AuthContext";

const Register = () => {
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { setAuth } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !surname || !email || !password) {
            showToast("warning",'Please fill in all fields');
            return;
        }
        try {
            const data = await registerUser({ name, surname, email, password });
            showToast("success",'Registration successful!');
            navigateToLogin();
        } catch (error) {
            console.error(error);
            showToast("danger",'Registration failed!');
        }
    };


    const navigateToLogin = () => {
        navigate(`/login`);
    };

    return (
        <Container className="login-wrapper">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="surname"
                        placeholder="Enter Surename"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Registered? <Link to="/login">Login</Link>
            </p>
        </Container>
    );
};

export default Register;
