import { convertDate } from "../../../utils";
import React from "react";
import { Button, Container } from "react-bootstrap";

export default function DetailHeader({ goBackToContent, detailDate }) {
  return (
    <Container className="head d-flex justify-content-between">
      <Button onClick={goBackToContent} className="go-back-button">
        <i className="bi bi-chevron-left"></i>List
      </Button>
      <h2>{convertDate(detailDate)}</h2>
      <Button onClick={goBackToContent} className="go-back-button">
        <a
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet"
          data-size="large"
        >
          Tweet
        </a>
      </Button>
    </Container>
  );
}
