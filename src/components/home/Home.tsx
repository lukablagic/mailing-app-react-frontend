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
  const seenSubjects = new Set();
const [showAttachemnts, setShowAttachemnts] = useState(true);
  useEffect(() => {
    getEmails(token).then((res) => setEmails(res));
  }, [token]);

  const handleEmailClick = (id) => {
    setSelectedEmailUid(id);
  };

  const handleStatusUpdate = () => {
    getEmails(token).then((res) => setEmails(res));
  };
  // Filter the emails to only show those with an empty in_reply_to field and unique subjects
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
      if (email.to_recipients.includes(user.email)) {
        return false;
      }
    }
    seenSubjects.add(email.subject);
    return true;
  });

  const handleEmailType = (type) => {
    setEmailType(type);
  };
  const toggleImageDisplay = () => {
    setShowAttachemnts(!showAttachemnts);
  };


  return (
    <div>
      <Container className="bg-light overflow-hidden ">
        <Header />
        <Container className="">
          <ToolbarComponent
            emails={emails}
            handleStatusUpdate={handleStatusUpdate}
            selectedEmailUid={selectedEmailUid}
            toggleImageDisplay={toggleImageDisplay}
            showAttachemnts={showAttachemnts}
          />
        </Container>
        <Row className="flex-grow-1 vh-100">
          <Col xs={12} md={2} className="py-3 py-md-0">
            <Options handleItemSelected={handleEmailType} />
          </Col>
          <Col xs={12} md={2} className="py-4 py-md-0">
            <Inbox
              filteredEmailsInbox={filteredEmailsInbox}
              handleEmailClick={handleEmailClick}
              selectedEmailUid={selectedEmailUid}
              handleReload={handleStatusUpdate}
            />
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column xp-3">
            <Details emails={emails} selectedEmailUid={selectedEmailUid} showAttachments={showAttachemnts} />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
