import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function SimulatedProgressBar() {
  const [progress, setProgress] = useState(20);

  setInterval(() => {
    setProgress((prevProgress) => {
      if (prevProgress >= 99) {
        return 99;
      }
      return prevProgress + Math.floor(Math.random() * 8);
    });
  }, 300);

  return <ProgressBar animated now={progress} />;
}