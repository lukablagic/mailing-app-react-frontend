import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import Outline from './Outline';
import { TbMailFast, TbMail } from 'react-icons/tb';

const Options = ({ handleItemSelected }) => {
  const handleItemClick = (item) => {
    handleItemSelected(item);
  };

  return (
    <Outline>
      <div>
        <h4>Options</h4>
        <ListGroup>
          <ListGroup.Item action onClick={() => handleItemClick('inbox')}>
            <TbMail /> Inbox
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => handleItemClick('sent')}>
            <TbMailFast /> Sent
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Outline>
  );
};

export default Options;
