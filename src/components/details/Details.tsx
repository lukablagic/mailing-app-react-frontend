import {  useEffect, useState } from "react";
import { Card, Col,  Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Outline from "../home/Outline";
import Attachments from "./Attachments";
const Details = ({ emails, selectedEmail, showAttachments }) => {

  const [replies, setReplies]                       = useState([]);
  const [disableAttachments, setDisableAttachments] = useState(false);
 
  useEffect(() => {
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
    setDisableAttachments(showAttachments);
  }, [emails, selectedEmail,showAttachments]);

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

  const removeImg = (email) => {
    const start = email.indexOf("<img");
    const end = email.indexOf(">", start);
    if (start !== -1 && end !== -1) {
      // Remove the image tag from the email body
      const withoutImg = email.slice(0, start) + email.slice(end + 1);
      return withoutImg;
    }
    return email;
  };
  return (
    <div >
    <Outline>
      <h1>Details</h1>
      <div className="justify-content-start  py-md-0  ">
        {selectedEmail ? (
          <>
            <h4>{selectedEmail.subject}</h4>
            
              <Accordion>
                <Card>
              {replies.length > 0 && (
                <>
                  <div className="scroll">
                  {replies.map((email) => (
                    <div key={email.id} className="details-list">

                        <Accordion.Item eventKey={email.id}>
                          <Accordion.Header>
                            <div>
                              <Row>
                                <Col sm={11} >
                                  <div className="d-flex ">
                                  <p>From: {email.from}</p>
                                  <p
                                    className="me-1"
                                    dangerouslySetInnerHTML={{
                                      __html: getBodyPreview(
                                        removeQuotes(email.body)
                                      ),
                                    }}
                                  />
                                  </div>
                                 
                                  
                                </Col>
                              </Row>
                            </div>
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
                              dangerouslySetInnerHTML={{ __html: removeImg(email.body) }}
                            />
                              {email.has_attachment ? (
                            <Attachments emails={emails} showAttachments={showAttachments} selectedEmail={selectedEmail}/>
                              ):( <h4>No Attachments available!</h4>)}</Accordion.Body>
                        </Accordion.Item>

                    </div>
                  ))}
                  </div>
                </>
              )}
                  </Card>
              </Accordion>
          </>
        ) : (
          <h4>Please select an email to read!</h4>
        )}
      </div>
    </Outline>
    </div>
  );
};

export default Details;
