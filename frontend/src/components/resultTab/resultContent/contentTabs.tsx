import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./contentTabs.scss";

const TabButton = ({ isActive, onClick, children }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      className={`tab-button ${isActive ? "active-tab" : ""}`}
    >
      {children}
    </Button>
  );
};

export const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("day");

  const handleTabClick = (tab: "day" | "chart" | "meteogram") => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabButton
        isActive={activeTab === "day"}
        onClick={() => handleTabClick("day")}
      >
        Day view
      </TabButton>
      <TabButton
        isActive={activeTab === "chart"}
        onClick={() => handleTabClick("chart")}
      >
        Daily Temp. Chart
      </TabButton>
      <TabButton
        isActive={activeTab === "meteogram"}
        onClick={() => handleTabClick("meteogram")}
      >
        Meteogram
      </TabButton>
    </>
  );
};
