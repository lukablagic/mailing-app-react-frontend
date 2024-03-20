import React from 'react';
import { Container } from 'react-bootstrap';

const Outline = ({ children }) => {
  return (
    <Container className="border rounded outline " >
      <div className="mt-3">
        {children}
      </div>
    </Container>
  );
};

export default Outline;
