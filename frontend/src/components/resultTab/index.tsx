import React, { useState } from "react";
import { ResultHeader } from "./resultHeader";
import { Container } from "react-bootstrap";
import ResultContent from "./resultContent";
import ResultDetails from "./resultDetails";
import "./index.scss";

export default function ResultTab() {
  const [page, setPage] = useState<"content" | "details">("content");
  const [animation, setAnimation] = useState("");

  const goToDetails = () => {
    setAnimation("slide-out-left");
    setTimeout(() => {
      setPage("details");
      setAnimation("slide-in-right");
    }, 300);
  };

  const goBackToContent = () => {
    setAnimation("slide-out-right");
    setTimeout(() => {
      setPage("content");
      setAnimation("slide-in-left");
    }, 300);
  };

  return (
    <Container>
      <div>
        <div className={page === "content" ? animation : "hide"}>
          <ResultHeader goToDetails={goToDetails} />
          <ResultContent />
        </div>
        <div className={page === "details" ? animation : "hide"}>
          <ResultDetails goBackToContent={goBackToContent} />
        </div>
      </div>
    </Container>
  );
}
