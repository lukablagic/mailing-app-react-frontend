import React from 'react';
import { Container } from 'react-bootstrap';

const Outline = ({ children }) => {
  return (
    <Container className="d-flex flex-column border rounded" style={{ height: '100%' }}>
      <div className="mt-3">
        {children}
      </div>
    </Container>
  );
};

export default Outline;
