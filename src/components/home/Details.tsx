import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import parse from "html-react-parser";
import Outline from "./Outline";

const Details = ({ emails, selectedEmailId }) => {
  const [showReplies, setShowReplies] = useState(false); // State to track whether replies should be displayed

  const selectedEmail = selectedEmailId
    ? emails.find((email) => email.uid === selectedEmailId)
    : null;

  const print = (id) => {
    console.log(id);
    return id;
  };

  const filteredEmailsDetails = selectedEmail
    ? emails.filter((email) => email.in_reply_to === selectedEmail.uid)
    : [];

  return (
    <Outline>
      <h1>Details</h1>
      <Container className="justify-content-center py-1 py-md-0">
        {selectedEmail ? (
          <>
            <h4>{selectedEmail.subject}</h4>
            <p>From: {selectedEmail.from}</p>
             {selectedEmail.cc_recipients ? <p>CC: {selectedEmail.cc_recipients}</p> : ""}
             {selectedEmail.bcc_recipients ? <p>CC: {selectedEmail.bcc_recipients}</p> : ""}

            <p>Date: {new Date(selectedEmail.sent_date).toLocaleString()}</p>
            <p dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
            <p>Has attachment: {selectedEmail.has_attachment ? "Yes" : "No"}</p>

            {filteredEmailsDetails.length > 0 && (
              <>
                <Button
                  variant="primary"
                  onClick={() => setShowReplies(!showReplies)}
                >
                  {showReplies ? "Hide Replies" : "Show Replies"}
                </Button>
                {showReplies && (
                  <>
                    <h4>Replies</h4>

                    {filteredEmailsDetails.map((email) => (
                      <div key={email.id}>
                        <p>From: {email.from}</p>
                        <p>CC: {email.cc_recipients}</p>
                        <p>BCC: {email.bcc_recipients}</p>
                        <p>
                          Date: {new Date(email.sent_date).toLocaleString()}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: email.body }} />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            <Button
              variant="primary"
              onClick={() => alert("Replying to conversation...")}
            >
              Reply
            </Button>
          </>
        ) : (
          <h4>Please select an email to read!</h4>
        )}
      </Container>
    </Outline>
  );
};

export default Details;
