import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Outline from "./Outline";
import Accordion from "react-bootstrap/Accordion";
import { HiOutlineTrash } from "react-icons/hi";
import { AuthContext } from "../common/AuthContext";
import Attachments from "./Attachments";
const Details = ({ emails, selectedEmailUid, showAttachments }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const selectedEmail = emails.find(
      (email) => email.uid === selectedEmailUid
    );
    setSelectedEmail(selectedEmail);

    const filteredEmails = emails.filter((email) => {
      if (selectedEmail == null) {
        return false;
      }
      if (email.subject.startsWith(selectedEmail.subject)) {
        return true;
      }
      if (email.subject.startsWith("Re: " + selectedEmail.subject)) {
        return true;
      }

      return false;
    });
    const sortedReplies = filteredEmails.sort((a, b) => {
      const dateA = new Date(a.sent_date);
      const dateB = new Date(b.sent_date);
      return dateA.getTime() - dateB.getTime();
    });
    setReplies(sortedReplies);
  }, [emails, selectedEmailUid]);

  const getBodyPreview = (body) => {
    const maxLength = 60; // Maximum number of characters for the preview
    if (body.length <= maxLength) {
      return body;
    } else {
      return body.substring(0, maxLength) + "...";
    }
  };
  //create array of replies that are all lined one after the other
  const removeQuotes = (email): string => {
    // Remove the quotes div from the email body
    const start = email.indexOf('<div class="ltr">');
    const end = email.indexOf("</div>");
    if (end == -1) {
      return removeQuotes2(email);
    }
    const quote = email.substring(start, end);
    return quote;
  };

  const removeQuotes2 = (email) => {
    const start = 0;
    const end = email.indexOf("On");
    const quote = email.substring(start, end);
    return quote;
  };


  return (
    <Outline>
      <h1>Details</h1>
      <Container className="justify-content-center py-1 py-md-0">
        {selectedEmail ? (
          <>
            <h4>{selectedEmail.subject}</h4>
            <Outline>
              {replies.length > 0 && (
                <>
                  {replies.map((email) => (
                    <div key={email.id}>
                      <Accordion>
                        <Accordion.Item eventKey={email.id}>
                          <Accordion.Header>
                            <Container>
                              <Row>
                                <Col sm={11}>
                                  <p>From: {email.from}</p>
                                  <p
                                    className="me-1"
                                    dangerouslySetInnerHTML={{
                                      __html: getBodyPreview(
                                        removeQuotes(email.body)
                                      ),
                                    }}
                                  />
                                </Col>
                                <Col sm={1}>
                                  <Button
                                    className="mt-3"
                                    variant="light"
                                    size="sm"
                                  >
                                    <HiOutlineTrash />
                                  </Button>
                                </Col>
                              </Row>
                            </Container>
                          </Accordion.Header>
                          <Accordion.Body>
                            <h5>{email.subject}</h5>
                            <p>From: {email.from}</p>
                            <p>To: {email.to_recipients}</p>
                            <p>CC: {email.cc_recipients}</p>
                            <p>BCC: {email.bcc_recipients}</p>
                            <p>
                              Date: {new Date(email.sent_date).toLocaleString()}
                            </p>
                            <p
                              dangerouslySetInnerHTML={{ __html: email.body }}
                            />
                              {email.has_attachment ? (
                            <Attachments emails={emails} selectedEmailUid={selectedEmailUid}/>
                              ):( <h4>No Attachments available!</h4>)}</Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                </>
              )}
            </Outline>
          </>
        ) : (
          <h4>Please select an email to read!</h4>
        )}
      </Container>
    </Outline>
  );
};

export default Details;
