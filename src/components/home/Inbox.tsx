import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Inbox = ({ emails, handleEmailClick, selectedEmailId }) => {
  // Filter the emails to only show those with an empty in_reply_to field
  const filteredEmails = emails.filter((email) => email.in_reply_to === "");

  return (
    <div style={{ height: "95vh ", overflowY: "scroll" }}>
      <ListGroup>
        {filteredEmails.map((email) => (
          <ListGroup.Item
            key={email.id}
            onClick={() => handleEmailClick(email.uid)}
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
