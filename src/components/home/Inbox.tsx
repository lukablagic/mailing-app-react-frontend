import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Outline from './Outline';
import MailAPI from '../../api/MailAPI';

const Inbox = (props) => {
  const [emails, setEmails] = useState([{ id: 0, subject: 'Loading...' }]);

  useEffect(() => {
    if (props !== null) {
      console.log(props)
      setEmails(props.emails);;
    }
  }, [props.emails]);

  return (
    <Outline>
      <h1>Inbox</h1>
      
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item key={email.id}>{email.subject}</ListGroup.Item>
        ))}
      </ListGroup>
    </Outline>
  );
};

export default Inbox;
