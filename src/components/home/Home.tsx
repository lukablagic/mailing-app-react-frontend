import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "./Details";
import Footer from "./Footer";
import Header from "./Header";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import Options from "./Options";
import Inbox from "./Inbox";
import { getEmails } from "../../api/Mail";
import { AuthContext } from "../../components/common/AuthContext";

const Home = () => {
  const { token,user } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
  const [emailType, setEmailType] = useState("inbox");
  const [showAttachments, setShowAttachments] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const seenSubjects = new Set();
  const seenSubjectsSent = new Set();

  useEffect(() => {

    getEmails(token).then((res) => setEmails(res));

  }, [token]);

  const handleEmailClick = (id) => {

    setSelectedEmailUid(id);
    setSelectedEmail(emails.find((email) => email.uid === id));
    console.log("selectedEmailUid",selectedEmailUid)
  };

  const handleStatusUpdate = () => {
    getEmails(token).then((res) => setEmails(res));
  };

  const filteredEmailsInbox = emails.filter((email) => {
    if (emailType === "inbox") {
      if (email.in_reply_to !== null) {
        return false;
      }
      if (email.subject.startsWith("Re:")) {
        return false;
      }
      if (seenSubjects.has(email.subject)) {
        return false;
      }
    } else if (emailType === "sent") {
      if (email.in_reply_to !== null) {
        return false;
      }
      if (email.from == user.email) {
        return false;
      }
    }
    return true;
  });

  const handleEmailType = (type) => {
    setSelectedEmailUid(null); // Reset selected email UID
    seenSubjects.clear(); // Clear seenSubjects set
    seenSubjectsSent.clear(); // Clear seenSubjectsSent set
    setEmailType(type);
  };

  const toggleImageDisplay = () => {
    setShowAttachments(!showAttachments);
  };

  return (

        <div className="bg-light  Home">
          <Header />
          <div >
            <ToolbarComponent
                emails={emails}
                handleStatusUpdate={handleStatusUpdate}
                selectedEmailUid={selectedEmailUid}
                toggleImageDisplay={toggleImageDisplay}
                showAttachments={showAttachments}
            />
          </div>
          <Row className="flex-grow-1 ">
            <Col xs={12} md={2} className="py-3 py-md-0">
              <Options handleItemSelected={handleEmailType} />
            </Col>
            <Col xs={12} md={2} className="py-4 py-md-0">
              <Inbox
                  filteredEmailsInbox={filteredEmailsInbox}
                  handleEmailClick={handleEmailClick}
                  handleReload={handleStatusUpdate}
              />
            </Col>
            <Col xs={12} md={8} className="d-flex flex-column xp-3">
              <Details emails={emails} selectedEmail={selectedEmail} showAttachments={showAttachments} />
            </Col>
          </Row>
        </div>

  );
};

export default Home;
