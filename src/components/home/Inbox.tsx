import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Outline from './Outline';


const Inbox = (props) => {
  const [emails, setEmails] = useState([{ id: 0, subject: 'Loading...' }]);


  return (
    <Outline>
      <h1>Inbox</h1>
      <ListGroup>
          <ListGroup.Item ></ListGroup.Item>
      </ListGroup>
    </Outline>
  );
};

export default Inbox;
