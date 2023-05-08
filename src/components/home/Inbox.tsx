import React from "react";
import { Button, Card, ListGroup, Container, Row, Col } from "react-bootstrap";
import { AiOutlineReload } from "react-icons/ai";
import Outline from "./Outline";

const Inbox = ({
  filteredEmailsInbox,
  handleEmailClick,
  selectedEmailUid,
  handleReload,
}) => {
  return (
    <Outline >
      <Container>
        <Row>
          <Col>
            <h2>Inbox</h2>
          </Col>
          <Col>
            <Button
              variant="light"
              onClick={handleReload}
              size="sm"
              className="float-right mt-1"
            >
              <AiOutlineReload />
            </Button>
          </Col>
        </Row>
      </Container>

      <ListGroup>
        {filteredEmailsInbox.map((email) => (
          <ListGroup.Item
            key={email.id}
            onClick={() => handleEmailClick(email.uid)}
            className={email.is_read ? "read-email" : "unread-email"}
            style={{ cursor: "pointer" }}
          >
            <Card
              border="light"
              className={email.is_read ? "read-email" : "unread-email"}
              style={{ padding: "10px" }}
            >
              <Card.Body>
                <Card.Title>{email.subject}</Card.Title>
                <Card.Text>
                  {new Date(email.sent_date).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Outline>
  );
};

export default Inbox;
