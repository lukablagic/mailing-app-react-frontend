import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Inbox = ({ emails, handleEmailClick, selectedEmailUid }) => {
  // Filter the emails to only show those with an empty in_reply_to field
  const filteredEmails = emails.filter((email) => email.in_reply_to === null);
  
  return (
    <div style={{ height: "95vh ", overflowY: "scroll" }}>
      <ListGroup>
        {filteredEmails.map((email) => (
          <ListGroup.Item
            key={email.id}
            onClick={() => handleEmailClick(email.uid)}
            className={email.is_read ? "read-email" : "unread-email"} 
            style={{ cursor: "pointer" }}
          >
            <Card border="light"  className={email.is_read ? "read-email" : "unread-email"} style={{ padding: "10px" }}>
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
