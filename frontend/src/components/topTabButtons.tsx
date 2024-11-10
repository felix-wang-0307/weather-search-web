import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Container } from "react-bootstrap";
import "./topTabButtons.scss";

const TopTabButtons = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState("favorites");

  useImperativeHandle(ref, () => ({
    setActiveTab(tab: string) {
      setActiveTab(tab);
    },
    getActiveTab() {
      return activeTab;
    },
  }));

  return (
    <Container className="top-tab-buttons d-flex gap-3 mt-3 justify-content-center">
      <Button
        variant={activeTab === "results" ? "primary" : "light"}
        className={activeTab === "results" ? "active" : "inactive"}
        onClick={() => setActiveTab("results")}
      >
        Results
      </Button>
      <Button
        variant={activeTab === "favorites" ? "primary" : "light"}
        className={activeTab === "favorites" ? "active" : "inactive"}
        onClick={() => setActiveTab("favorites")}
      >
        Favorites
      </Button>
    </Container>
  );
});

export default TopTabButtons;