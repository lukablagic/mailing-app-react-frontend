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
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  useEffect(() => {
    getEmails(token).then((res) => setEmails(res));
  }, [token]);

  const handleEmailClick = (id) => {
    setSelectedEmailId(id);
  };

  return (
    <div>
      <Container className="bg-light overflow-hidden " style={{ width: "100%" }}>
        <Header />
        <Container className="d-flex flex-column vh-10 py-3 border rounded">
          <ToolbarComponent />
        </Container>
        <Row className="flex-grow-1 vh-100">
          <Col xs={12} md={2} className="py-3 py-md-0">
            <Options />
          </Col>
          <Col xs={12} md={2} className="py-4 py-md-0">
            <Inbox emails={emails} handleEmailClick={handleEmailClick} selectedEmailId={selectedEmailId} />
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column xp-3">
            <Details emails={emails} selectedEmailId={selectedEmailId} />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
