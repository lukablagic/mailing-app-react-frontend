import Outline from "./Outline";
import { Container, Button } from "react-bootstrap";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";

const Details = ({ emails, emailsDetails, selectedEmailId }) => {
  // Find the selected email by its ID
  const selectedEmail = selectedEmailId
    ? emails.find((email) => email.uid === selectedEmailId)
    : null;

  function replaceWithBr(replaceString) {
    return replaceString.replace(/\n/g, "<br />")
  }

  // Filter emails from emailsDetails that match the in_reply_to property of the selected email
  const filteredEmailsDetails = selectedEmail ? emails.filter((email) => email.in_reply_to === selectedEmail.uid) : [];

  // Render the email details or a message to select an email
  return (
    <Outline>
      <h1>Details</h1>
      <Container className="justify-content-center py-1 py-md-0">
        {selectedEmail ? (
          <>
            <h4>{selectedEmail.subject}</h4>
            <p>From: {selectedEmail.from}</p>
            <p>Date: {new Date(selectedEmail.sent_date).toLocaleString()}</p>
            <p dangerouslySetInnerHTML={{__html: replaceWithBr(selectedEmail.body)}} />
            <p>Replied to: {selectedEmail.in_reply_to}</p>
            <p>Has attachment: {selectedEmail.has_attachment ? "Yes" : "No"}</p>

            {filteredEmailsDetails.length > 0 && (
              <>
                <h4>Replies</h4>
                <ul>
                  {filteredEmailsDetails.map((email) => (
                    <li key={email.uid}>
                      <p>{email.from}</p>
                      <p>{new Date(email.sent_date).toLocaleString()}</p>
                      <p dangerouslySetInnerHTML={{__html: replaceWithBr(email.body)}} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Button variant="primary" onClick={() => alert("Replying to conversation...")}>Reply</Button>
          </>
        ) : (
          <h4>Please select an email to read!</h4>
        )}
      </Container>
    </Outline>
  );
};

export default Details;
