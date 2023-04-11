import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import Outline from './Outline';
import { HiExclamationCircle } from 'react-icons/hi';

const Options = () => {
  return (
    // Use the custom container component with full height and outline
    <Outline >
 <Container>
      <h4>Options</h4>
      <ListGroup>
        <ListGroup.Item action>Sent</ListGroup.Item>
        <ListGroup.Item action>Mark as read</ListGroup.Item>
        <ListGroup.Item action><HiExclamationCircle/>Important</ListGroup.Item>
      </ListGroup>
  </Container>
    </Outline>
  );
};
export default Options;