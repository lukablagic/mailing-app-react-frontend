import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details  from "./Details";
import Footer from "./Footer";
import Header from './Header';
import ToolbarComponent from "./ToolbarComponent";
import Options from "./Options";
import Inbox from "./Inbox";



const Home = (loginData) => {
  return (
    <div>
 
      <Container
        className="bg-light overflow-hidden "
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Header />
        <Container className="d-flex flex-column vh-10 py-3 border rounded">
          <ToolbarComponent  />
        </Container>
        <Row className="flex-grow-1 vh-100">
          <Col xs={12} md={2} className="py-3 py-md-0">
            <Options />
          </Col>
          <Col xs={12} md={2} className="py-3 py-md-0">
            <Inbox loginData={loginData}/> //props email and password
          </Col>
          <Col xs={12} md={8} className="d-flex flex-column xp-3">
            <Details />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
