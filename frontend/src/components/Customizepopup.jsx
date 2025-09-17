import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  ToggleButton,
} from "react-bootstrap";

export default function CustomizeFeedModal({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [interest, setInterest] = useState("interested"); // default

  const handleAdd = () => {
    alert(`Added: ${searchTerm} (${interest})`);
    setSearchTerm("");
    setInterest("interested");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="border-0 pb-0 heading-text ">
        <Modal.Title
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
          }}
        >
           Customize Feed
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "1rem 1.5rem" }}>
        {/* Options */}
        <Row className="mb-4 text-center">
          <Col>
            <ToggleButton
              id="radio-interested"
              type="radio"
              variant={
                interest === "interested" ? "success" : "outline-success"
              }
              name="options"
              value="interested"
              checked={interest === "interested"}
              onChange={(e) => setInterest(e.currentTarget.value)}
              className="w-100 py-2 sub-heading-text"
            >
               Interested
            </ToggleButton>
          </Col>
          <Col>
            <ToggleButton
              id="radio-notinterested"
              type="radio"
              variant={
                interest === "notinterested" ? "danger" : "outline-danger"
              }
              name="options"
              value="notinterested"
              checked={interest === "notinterested"}
              onChange={(e) => setInterest(e.currentTarget.value)}
              className="w-100 py-2 sub-heading-text"
            >
               Not Interested
            </ToggleButton>
          </Col>
        </Row>

        {/* Search Input + Add */}
        <Row className="g-2 align-items-center">
          <Col xs={8} sm={9}>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                className="normal-text"
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={4} sm={3}>
            <Button
              className="w-100 normal-text "
              variant="primary"
              onClick={handleAdd}
              style={{ fontWeight: "500" }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
