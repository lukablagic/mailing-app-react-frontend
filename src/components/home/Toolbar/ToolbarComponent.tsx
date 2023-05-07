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
import Editor from "./Editor";
import { updateEmailStatus } from "../../../api/Mail";
import { AuthContext } from "../../common/AuthContext";
import Forward from "./Forward";
import Reply from "./Reply";

const ToolbarComponent = ({ emails, selectedEmailUid, handleStatusUpdate }) => {
  const { token } = useContext(AuthContext);


  const selectedEmail = selectedEmailUid
    ? emails.find((email) => email.uid === selectedEmailUid)
    : null;

  const changeStatus = async () => {
    event.preventDefault();
    try {
      let status;
      if (selectedEmail.is_read == 0) {
        status = false;
      } else if (selectedEmail.is_read == 1) {
        status = true;
      }
      updateEmailStatus(selectedEmail.id, !status, token);
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
          <Editor  />
          <Button className="mx-1" variant="secondary">
            <HiOutlineTrash />
            Trash
          </Button>
          <Reply emails={emails} selectedEmailUid={selectedEmailUid} selectedEmail={selectedEmail} />
          <Forward emails={emails} selectedEmailUid={selectedEmailUid}  selectedEmail={selectedEmail}/>
          <Button className="mx-1" variant="secondary" onClick={changeStatus}>
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
