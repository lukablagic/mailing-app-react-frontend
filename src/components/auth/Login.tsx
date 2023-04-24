import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';
const Login = (onLogin) => {

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigateToHome = () => {
    const navigate = useNavigate();
    navigate(`/`);
  };

  const handleLogin = (event) => {
    event.preventDefault();
  //  login(loginData.email, loginData.password)
  //     .then((response) => {
  //       console.log(response);
  //       return response;  
  //     })
  //     .catch((error) => {
  //       // handle login error
  //     });
  //     navigateToHome();
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
            value={loginData.email}
            onChange={(event) =>
              setLoginData({ ...loginData, email: event.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
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
