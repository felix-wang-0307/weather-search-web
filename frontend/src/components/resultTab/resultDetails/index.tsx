import React from "react";
import { Button, Container } from "react-bootstrap";

export default function ResultDetails({ goBackToContent }) {
  return (
    <Container>
      <Button onClick={goBackToContent}>
        <i className="bi bi-chevron-left"></i>List
      </Button>
    </Container>
  );
}
