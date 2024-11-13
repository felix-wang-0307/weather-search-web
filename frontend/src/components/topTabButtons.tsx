/**
 * @file topTabButtons.tsx is a component that renders the top tab buttons for the app.
 * The tabs are "Results" and "Favorites".
 */
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Container } from "react-bootstrap";
import "./topTabButtons.scss";
import { ITabRef } from "../types";

const TopTabButtons = forwardRef<ITabRef, { onTabChange: (tab: string) => void }>(
  ({ onTabChange }, ref) => {
    const [activeTab, setActiveTab] = useState("results");

    useImperativeHandle(ref, () => ({
      setActiveTab(tab: string) {
        setActiveTab(tab);
      },
      getActiveTab() {
        return activeTab;
      },
    }));

    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      onTabChange(tab);
    };

    return (
      <Container className="top-tab-buttons d-flex gap-3 mt-3 justify-content-center">
        <Button
          variant={activeTab === "results" ? "primary" : "light"}
          className={activeTab === "results" ? "active" : "inactive"}
          onClick={() => handleTabClick("results")}
        >
          Results
        </Button>
        <Button
          variant={activeTab === "favorites" ? "primary" : "light"}
          className={activeTab === "favorites" ? "active" : "inactive"}
          onClick={() => handleTabClick("favorites")}
        >
          Favorites
        </Button>
      </Container>
    );
  }
);

export default TopTabButtons;