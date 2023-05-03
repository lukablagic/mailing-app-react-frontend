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
  const { token } = useContext(AuthContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState(null);
const [replyMail, setReplyMail] = useState(null);

  useEffect(() => {
    getEmails(token).then((res) => setEmails(res));
  }, [token]);

  const handleEmailClick = (id) => {
    
    setSelectedEmailUid(id);
  };
  const handleStatusUpdate = () => {
    getEmails(token).then((res) => setEmails(res));
  };

  const handleReplyMail = (uid) => {
    setReplyMail(uid);
  };
  return (
    <div>
      <Container
        className="bg-light overflow-hidden "
      >
        <Header />
        <Container className="d-flex flex-column vh-12 py-3 border rounded">
          <ToolbarComponent emails={emails} handleStatusUpdate={handleStatusUpdate} selectedEmailUid={selectedEmailUid} />
        </Container>
        <Row className="flex-grow-1 vh-100">
          <Col xs={12} md={2} className="py-3 py-md-0">
            <Options />
          </Col>
          <Col xs={12} md={2} className="py-4 py-md-0">
            <Inbox
              emails={emails}
              handleEmailClick={handleEmailClick}
              selectedEmailUid={selectedEmailUid}
            />
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column xp-3">
            <Details emails={emails} selectedEmailUid={selectedEmailUid}  />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;