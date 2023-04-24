import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/Auth";

const Register = ({ onRegister }) => {
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await registerUser({ name, surname, email, password });
   //   saveAuthData(data);
      onRegister();
      navigateToHome();
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(`/`);
  };

  return (
      <Container>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Surename</Form.Label>
            <Form.Control
              type="text"
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
            Submit
          </Button>
        </Form>
      </Container>
    );
  };
export default Register;  