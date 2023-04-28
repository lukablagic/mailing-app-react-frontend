import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Container, Modal } from "react-bootstrap";
import {Something } from "./SlateEditor/Editor";
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineReply,
  HiOutlineMailOpen,
  HiArrowNarrowRight,
} from "react-icons/hi";
import Editor from "./NewMailEditor";

const ToolbarComponent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3 "
    >
      <Tab eventKey="home" title="Home">
        <Container className="Container">
          <Button  onClick={handleShow} variant="primary">
            <HiOutlineMail className="mr-2" />
            New Email
          </Button>
          <Modal show={show} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Send New Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body><Editor/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          <Button className="mx-1" variant="secondary">
            <HiOutlineTrash />
            Trash
          </Button>
          <Button className="mx-1" variant="secondary">
            <HiOutlineReply />
            Reply
          </Button>
          <Button className="mx-1" variant="secondary">
            <HiOutlineReply />
            Reply All
          </Button>
          <Button className="mx-1" variant="secondary">
            <HiArrowNarrowRight />
            Forward
          </Button>
          <Button className="mx-1" variant="secondary">
            <HiOutlineMailOpen />
            Unread / Read
          </Button>
        </Container>
      </Tab>
      <Tab eventKey="send-receive" title="Send / Receive">
        <Container className="Container">
          <Button className="mx-1" variant="primary">
            <HiArrowNarrowRight />
            Send All
          </Button>
        </Container>{" "}
      </Tab>
 
    </Tabs>
  );
};

export default ToolbarComponent;
