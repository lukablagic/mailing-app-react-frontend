import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { loginUser } from "../api/Auth";
import { ToastContext } from "../utility/contexts/ToastContext";
import { AuthContext } from "../utility/contexts/AuthContext";
import { getUserData } from "../api/User";

const Login = () => {
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
      localStorage.setItem("token",token);
      setUser(getUserData(token));
      const userData = await getUserData(token);
      localStorage.setItem("user",JSON.stringify(userData));
      showToast("success",'Login successful!');
      navigateToHome();
    } catch (error) {
      console.error(error);
      showToast("success",'Login failed!');
    }
  };

  return (
      <Container className="login-wrapper">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </Container>
  );
};

export default Login;
