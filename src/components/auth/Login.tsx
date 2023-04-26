import React, { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { loginUser } from "../../api/Auth";
import { ToastContext } from "../common/ToastContext";

const Login = ({onLogin}) => {
  const {showToast}  = useContext(ToastContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const navigateToHome = () => {
    
    navigate(`/`);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);
      onLogin(true);
      showToast('Login successful!');
      navigateToHome();
    } catch (error) {
      console.error(error);
     showToast('Login failed!');
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
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit"  >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

