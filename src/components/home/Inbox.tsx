import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import Outline from './Outline';
import { getEmails } from '../../api/Mail';
import { AuthContext } from  '../../components/common/AuthContext';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const {token} = useContext(AuthContext);
  useEffect(() => {
    getEmails(token)
      .then((data) => setEmails((prevEmails) => [...prevEmails, data])
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  return (
    <Outline>
      <h1>Inbox</h1>
      <ListGroup >
        {emails.map((email) => (
          <ListGroup.Item key={email.uid}>{email.subject}</ListGroup.Item>
        ))}
      </ListGroup>
    </Outline>
  );
};

export default Inbox;
