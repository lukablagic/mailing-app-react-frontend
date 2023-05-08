import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { Button, Col, Container, Form, Modal } from "react-bootstrap";
import { HiOutlineReply } from "react-icons/hi";
import { replyEmail } from "../../../api/Mail";
import { AuthContext } from "../../common/AuthContext";

const Forward = ({ placeholder, selectedEmail, selectedEmailUid, emails }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState([]);
  const [cc, setCC] = useState([]);
  const [bcc, setBCC] = useState([]);
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);
  const { token, user } = useContext(AuthContext);

  const handleClose = () => {
    setShow(false);
    resetForward();
  };

  const handleShow = () => {
    setShow(true);
    prepareForward();
  };
  const getReplies = (emailUid, emails) => {
    const email = emails.find((email) => email.uid === emailUid);
    if (!email) return [];
    const replies = emails.filter((email) => email.in_reply_to === emailUid);
    const subReplies = replies.flatMap((reply) =>
      getReplies(reply.uid, emails)
    );
    return [email, ...subReplies];
  };
  const prepareForward = () => {
    setSubject("Fwd: " + selectedEmail.subject);
    let replyBody =
      "<br><b>On " +
      replyLatest.sent_date +
      ", " +
      replyLatest.from +
      " wrote:</b><br>" +
      replyLatest.body;
    setEditorHtml(
      `<br><br>---------- Forwarded message ---------<br>From: ${replyLatest.from}<br>Date: ${replyLatest.sent_date}<br>Subject: ${replyLatest.subject}<br><br>${replyLatest.body}`
    );
  };
  const replies = selectedEmail ? getReplies(selectedEmailUid, emails) : [];
  const replyLatest = replies ? replies[replies.length - 1] : selectedEmail;

  const resetForward = () => {
    setSubject("");
    setTo([]);
    setCC([]);
    setBCC([]);
    setEditorHtml("");
  };

  const handleForwardEmail = () => {
    const forward = {
      subject: subject,
      to: to,
      cc: cc,
      bcc: bcc,
      body: editorHtml,
      in_reply_to: null,
      references: null,
    };

    replyEmail(token, forward);
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
      <Button className="mx-1" onClick={handleShow} variant="secondary">
        <HiOutlineReply />
        Forward
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{subject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForwardEmail}>
            <Form.Group controlId="subject">
              <Form.Group controlId="subject">
                <Form.Label className="mb-0" style={{ fontSize: "1.2rem" }}>
                  Subject:
                </Form.Label>
                <Col md={8} className="w-100">
                  <Form.Control
                    disabled={true}
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleForwardEmail}
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
Forward.propTypes = {
  placeholder: PropTypes.string,
};

export default Forward;
