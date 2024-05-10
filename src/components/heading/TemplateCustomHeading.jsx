import React, { useState, useEffect } from "react";
import { themeColor } from "../../utilis/constants";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useAmazonUrl } from "../../utilis/useAmazonUrl";
import "../../../src/TempateCustomHeading.css";

function TemplateCustomHeading({ heading }) {
  const values = ["xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  let [htmlContent, setHtmlContent] = useState("HTML");
  let [cssContent, setCssContent] = useState("CSS");

  const getAmazonUrl = useAmazonUrl();
  let TemplateUrl = getAmazonUrl("template_list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TemplateUrl.url.get_url);
        setDropdownData(response.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApiCall = async (breakpoint) => {
    try {
      // Call the first API to get the selected template URL
      const selectedTemplateResponse = await axios.get(
        `http://3.110.77.134:8000/api/outlets/template_urls/0f3e5539-5f3e-4549-b71c-4a41fbd65991/af67fcb7/${breakpoint}`
      );

      // Call the second API to get the CSS content
      const cssResponse = await axios.get(
        "https://qr4order001.s3.amazonaws.com/0f3e5539-5f3e-4549-b71c-4a41fbd65991/af67fcb7/templates/index.css?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYJJVOXVVQ26GYWHO%2F20240510%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240510T053823Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=8ec1c1278c2829f1a5b3533c6ef19d15d07874fb6c04c07b1b56ff5f14255c5f"
      );

      // Call the third API to get the HTML content
      const htmlResponse = await axios.get(
        "https://qr4order001.s3.amazonaws.com/0f3e5539-5f3e-4549-b71c-4a41fbd65991/af67fcb7/templates/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYJJVOXVVQ26GYWHO%2F20240510%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240510T053823Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=a30830ebd4bd8359d57ce9e200a178ccc009c6dca580e85d97100380358a6288"
      );

      setCssContent(cssResponse.data);
      setHtmlContent(htmlResponse.data);
    } catch (error) {
      console.error("Error fetching content:", error.message);
      setHtmlContent((htmlContent = error.message));
      setCssContent((htmlContent = error.message));
    }
  };

  const handleShowModal = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  return (
    <section className="editor_main_container">
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
          {/* Dropdown start */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select HTML
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdownData.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handleApiCall(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* Dropdown end */}
        </div>
      </div>
      <div className="Editor_container mt-3">
        <div className="overflow-auto scrollbar html_css_content_container">
          {/* Display HTML content */}
          <pre
            className={`${
              htmlContent === "HTML" ||
              htmlContent === "Request failed with status code 403"
                ? "Content_center "
                : ""
            }p-2`}
          >
            {htmlContent}
          </pre>
        </div>
        <div className="overflow-auto scrollbar html_css_content_container">
          {/* Display CSS content */}
          <pre
            className={`${
              htmlContent === "HTML" ||
              htmlContent === "Request failed with status code 403"
                ? "Content_center "
                : ""
            }p-2`}
          >
            {cssContent}
          </pre>
        </div>
      </div>
      <div
        className="btn_preview_save_container mt-3"
        style={{ justifyContent: "center", display: "flex" }}
      >
        {values.map((v, idx) => (
          <Button key={idx} className="me-3" onClick={() => handleShowModal(v)}>
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
