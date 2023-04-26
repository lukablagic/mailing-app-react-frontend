import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Inbox = ({ emails, handleEmailClick, selectedEmailId }) => {
  return (
    <div style={{ height: "95vh ", overflowY: "scroll" }}>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            style={{
              backgroundColor: selectedEmailId === email.id ? "#f8f9fa" : "white",
              cursor: "pointer",
            }}
          >
            <Card border="secondary" style={{ padding: "10px" }}>
              <Card.Body>
                <Card.Title>{email.subject}</Card.Title>
                <Card.Text>{new Date(email.sent_date).toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Inbox;
