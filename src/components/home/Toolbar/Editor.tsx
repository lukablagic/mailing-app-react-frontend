import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
import { HiOutlineMail } from "react-icons/hi";
import { sendEmail } from "../../../api/Mail";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState([]);
  const [cc, setCC] = useState([]);
  const [bcc, setBCC] = useState([]);
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { token } = useContext(AuthContext);

  const handleSendEmail = async () => {
    await sendEmail(token, subject, to, cc, bcc, editorHtml, "");
    handleClose();
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleToChange = (e) => {
    const toList = e.target.value.split(",");
    setTo(toList);
  };
  const handleCcChange = (e) => {
    const ccList = e.target.value.split(",");
    setCC(ccList);
  };
  const handleBccChange = (e) => {
    const bccList = e.target.value.split(",");
    setBCC(bccList);
  };
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
      <div>
        <Button onClick={handleShow} variant="primary">
          <HiOutlineMail className="mr-2" />
          New Email
        </Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{subject}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSendEmail}>
              <Form.Group controlId="subject">
                <Form.Label className="mb-0" style={{ fontSize: "1.2rem" }}>
                  Subject:
                </Form.Label>
                <Col md={8} className="w-100">
                  <Form.Control
                      type="text"
                      value={subject}
                      onChange={handleSubjectChange}
                      className="rounded w-100"
                      placeholder="Enter subject"
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="to">
                <Form.Label className="mb-0" style={{ fontSize: "1.2rem" }}>
                  To:
                </Form.Label>
                <Col md={8} className="w-100">
                  <Form.Control
                      type="text"
                      value={to}
                      onChange={handleToChange}
                      style={{ width: "100%" }}
                      className="rounded"
                      placeholder="Enter comma separated email addresses"
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="cc">
                <Form.Label className="mb-0" style={{ fontSize: "1.2rem" }}>
                  CC:
                </Form.Label>
                <Col md={8} className="w-100">
                  <Form.Control
                      type="text"
                      value={cc}
                      onChange={handleCcChange}
                      style={{ width: "100%" }}
                      className="rounded"
                      placeholder="Enter comma separated email addresses"
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="bcc">
                <Form.Label className="mb-0" style={{ fontSize: "1.2rem" }}>
                  BCC:
                </Form.Label>
                <Col md={8} className="w-100">
                  <Form.Control
                      type="text"
                      value={bcc}
                      onChange={handleBccChange}
                      style={{ width: "100%" }}
                      className="rounded"
                      placeholder="Enter comma separated email addresses"
                  />
                </Col>
              </Form.Group>
              <Container style={{ paddingTop: "20px" }}>
                <ReactQuill
                    onChange={handleChange}
                    value={editorHtml}
                    modules={modules}
                    formats={formats}
                    bounds=".app"
                    placeholder={placeholder}
                    style={{ height: "100%", width: "100%" }}
                />
              </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
                variant="primary"
                onClick={handleSendEmail}
                type="submit"
                disabled={sending}
            >
              {sending ? "Sending..." : "Send Mail"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;