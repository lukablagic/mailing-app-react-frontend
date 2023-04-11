import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, Container } from "react-bootstrap";
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineReply,
  HiOutlineMailOpen,
  HiArrowNarrowRight,
} from "react-icons/hi";

const ToolbarComponent = () => {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3 "
    >
      <Tab eventKey="home" title="Home">
        <Container className="Container">
          <Button variant="primary">
            <HiOutlineMail className="mr-2" />
            New Email
          </Button>
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
