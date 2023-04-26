import Outline from "./Outline";
import { Container} from "react-bootstrap";

const Details = ({emails, selectedEmailId}) => {
  // Find the selected email by its ID
  const selectedEmail = selectedEmailId ? emails.find(email => email.id === selectedEmailId) : null;

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
            <p>{selectedEmail.body}</p>
            <p>Replied to: {selectedEmail.replied_to}</p>
            <p>Read: {selectedEmail.is_read ? "Yes" : "No"}</p>
            <p>Draft: {selectedEmail.is_draft ? "Yes" : "No"}</p>
            <p>Sent: {selectedEmail.is_sent ? "Yes" : "No"}</p>
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
