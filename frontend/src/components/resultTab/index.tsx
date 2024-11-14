import React, { createContext, useState } from "react";
import { ResultHeader } from "./resultHeader";
import { Container } from "react-bootstrap";
import ResultContent from "./resultContent";
import ResultDetails from "./resultDetails";
import "./index.scss";

export const SlideContext = createContext<{
  goToDetails: (date: string) => void;
  goBackToContent: () => void;
  detailDate: string;
}>({} as any);

export default function ResultTab() {
  const [page, setPage] = useState<"content" | "details">("content");
  const [animation, setAnimation] = useState("");
  const [detailDate, setDetailDate] = useState("");  // ISO date string

  const goToDetails = (date: string) => {
    setDetailDate(date);
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
    <SlideContext.Provider value={{ goToDetails, goBackToContent, detailDate }}>
      <Container>
        <div className={page === "content" ? animation : "hide"}>
          <ResultHeader />
          <ResultContent />
        </div>
        <div className={page === "details" ? animation : "hide"}>
          <ResultDetails />
        </div>
      </Container>
    </SlideContext.Provider>
  );
}
