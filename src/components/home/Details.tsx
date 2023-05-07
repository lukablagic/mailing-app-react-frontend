import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Outline from "./Outline";
import Accordion from "react-bootstrap/Accordion";

const Details = ({ emails, selectedEmailUid }) => {
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
    const replies = selectedEmail ? filteredEmails : [];
    replies.sort((a, b) => {
      const dateA = new Date(a.sent_date);
      const dateB = new Date(b.sent_date);
      return dateA.getTime() - dateB.getTime();
    });
    setReplies(replies);
  }, [emails, selectedEmailUid]);

  //create array of replies that are all lined one after the other
  const removeQuotes = (email) => {
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
                            {" "}
                            <p>{email.from}</p>{" "}
                            <p
                              className="me-1"
                              dangerouslySetInnerHTML={{
                                __html: removeQuotes(email.body),
                              }}
                            />
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
                          </Accordion.Body>
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
