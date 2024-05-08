import React, { useState } from "react";
import { themeColor } from "../../utilis/constants";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAmazonUrl } from "../../utilis/useAmazonUrl";

function TemplateCustomHeading({ heading }) {
  const values = ["xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const getAmazonUrl = useAmazonUrl();

  let TemplateUrl = getAmazonUrl("template_list");

  console.log(TemplateUrl.url.get_url);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <section
      className="editor_main_container"
      style={{ height: "90vh", background: "currentColor" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          background: "transparent",
        }}
        className="mx-3 border-0"
      >
        <div className="d-flex align-items-center justify-content-center">
          <h5
            className="ms-lg-5 ps-lg-3 ms-md-5 ps-md-3  ms-2 ps-2"
            style={{
              color: "#d1caca",
              fontSize: "23px",
            }}
          >
            {heading}
          </h5>
        </div>
        <div className="d-flex align-items-center">
          {/* Dropdowm start */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select HTML
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Home.Html</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Home.CSS</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Dropdowm end */}
        </div>
      </div>
      <div
        className="Editor_container mt-3"
        style={{
          display: "grid",
          gridTemplateColumns: "49% 49%",
          columnGap: "10px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "70vh",
            background: "rgb(48 51 64)",
            border: "3px solid #b78e8e",
            color: "white",
          }}
        >
          Html
        </div>
        <div
          style={{
            height: "70vh",
            background: "rgb(48 51 64)",
            border: "3px solid #b78e8e",
            color: "white",
          }}
        >
          css
        </div>
      </div>
      <div
        className="btn_preview_save_container mt-3"
        style={{ justifyContent: "center", display: "flex" }}
      >
        {values.map((v, idx) => (
          <Button key={idx} className="me-3" onClick={() => handleShow(v)}>
            Preview
          </Button>
        ))}
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Modal body content</Modal.Body>
        </Modal>
        <Button variant="success">Save</Button>
      </div>
    </section>
  );
}

export default TemplateCustomHeading;
