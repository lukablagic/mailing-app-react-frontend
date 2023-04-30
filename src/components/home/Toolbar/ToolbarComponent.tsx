import React, { useContext, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Container, Modal } from "react-bootstrap";
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineReply,
  HiOutlineMailOpen,
  HiArrowNarrowRight,
} from "react-icons/hi";
import Editor from "./NewMailEditor";
import { updateEmailStatus } from "../../../api/Mail";
import { AuthContext } from "../../common/AuthContext";

const ToolbarComponent = ({emails,selectedEmailUid, handleStatusUpdate}) => {
  const {token} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectedEmail = selectedEmailUid
  ? emails.find((email) => email.uid === selectedEmailUid)
  : null;

const changeStatus = async () => {
  event.preventDefault();
  try {
    let status;
    if(selectedEmail.is_read == 0){
      status = false;

    }else if (selectedEmail.is_read == 1){
      status = true;
    }
    updateEmailStatus(selectedEmail.id,!status,token);
    handleStatusUpdate();
  } catch (error) {
    console.error(error);
  }
};

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
            <HiArrowNarrowRight />
            Forward
          </Button>
          <Button className="mx-1" variant="secondary" onClick={ changeStatus } >
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
