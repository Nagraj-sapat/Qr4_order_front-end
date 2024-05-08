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

// API
// "https://qr4order001.s3.amazonaws.com/0f3e5539-5f3e-4549-b71c-4a41fbd65991/26135e6e/template_list.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYJJVOXVVQ26GYWHO%2F20240508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240508T092111Z&X-Amz-Expires=25000&X-Amz-SignedHeaders=host&X-Amz-Signature=d83737dc2c1dbe083dce92230f36a271747c05b3d5ae31b8f2b57f3fb63ed919"

// http://3.110.77.134:8000/api/outlets/template_urls/4fb99ffc-a6dd-45c5-8812-1795b2fd90c7/859123dd/index

// "https://qr4order001.s3.amazonaws.com/859123dd/4fb99ffc-a6dd-45c5-8812-1795b2fd90c7/templates/index.css?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYJJVOXVVQ26GYWHO%2F20240508%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240508T111004Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=68a19c45f74ab81ded3173b6c87a275fad3d1320888f04d3a7beb2863489b60c",
