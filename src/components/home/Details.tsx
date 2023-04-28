import Outline from "./Outline";
import { Container } from "react-bootstrap";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";

const Details = ({ emails, selectedEmailId }) => {
  // Find the selected email by its ID
  const selectedEmail = selectedEmailId
    ? emails.find((email) => email.id === selectedEmailId)
    : null;
  const stringToHtml = (selectedEmail) => {
    const [html, setHtml] = useState<string>("");
    useEffect(() => {
      setHtml(replaceWithBr(selectedEmail));
    }, [html]);
  return <p>{parse(html)}</p>;
  };
  function replaceWithBr(replaceString) {
    return replaceString.replace(/\n/g, "<br />")
  }
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
            <p>Replied to: {selectedEmail.replied_to}</p>
            <p>Has attachment: {selectedEmail.has_attachment ? "Yes" : "No"}</p>
          </>
        ) : (
          <h4>Please select an email to read!</h4>
        )}
      </Container>
    </Outline>
  );
};
export default Details;
