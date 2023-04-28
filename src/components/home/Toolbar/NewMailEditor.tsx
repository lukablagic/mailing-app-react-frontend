import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Col, Form } from "react-bootstrap";

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
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

  return (
    <div>
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
          />
        </Col>
      </Form.Group>
      <div style={{ paddingTop: "20px" }}>
        <ReactQuill
          onChange={handleChange}
          value={editorHtml}
          modules={modules}
          formats={formats}
          bounds=".app"
          placeholder={placeholder}
          style={{ height: "100%", width: "100%"}}
        />
      </div>
    </div>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
