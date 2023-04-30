import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import Outline from './Outline';
import {TbMailFast,TbMail} from 'react-icons/tb';
const Options = () => {
  return (
    // Use the custom container component with full height and outline
    <Outline >
 <Container>
      <h4>Options</h4>
      <ListGroup>
        <ListGroup.Item action><TbMail />Inbox</ListGroup.Item>
        <ListGroup.Item action><TbMailFast />Sent</ListGroup.Item>
      </ListGroup>
  </Container>
    </Outline>
  );
};
export default Options;