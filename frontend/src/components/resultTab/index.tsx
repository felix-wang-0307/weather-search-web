import React, { useState } from "react";
import { ResultHeader } from "./resultHeader";
import { Container } from "react-bootstrap";
import ResultContent from "./resultContent";
import ResultDetails from "./resultDetails";

export default function ResultTab() {
  const [page, setPage] = useState<"content" | "details">("content");

  return (
    <Container>
      {page === "content" && (
        <>
          <ResultHeader goToDetails={() => setPage("details")}/>
          <ResultContent />
        </>
      )}
      {page === "details" && (
        <ResultDetails goBackToContent={() => setPage("content")}/>
      )}
    </Container>
  );
}
