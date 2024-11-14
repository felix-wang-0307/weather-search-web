import React, { useState, useImperativeHandle, forwardRef } from "react";
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

interface IContentTabProps {
  onTabChange: (tab: string) => void;
}

export const ContentTabs = forwardRef((props: IContentTabProps, ref) => {
  const [activeTab, setActiveTab] = useState("day");
  const { onTabChange } = props;

  const handleTabClick = (tab: "day" | "chart" | "meteogram") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  useImperativeHandle(ref, () => ({
    getActiveTab: () => activeTab,
  }));

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
});
