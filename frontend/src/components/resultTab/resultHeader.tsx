import { AppContext } from "../../appContext";
import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export const ResultHeader = () => {
  const { city, state } = useContext(AppContext);
  return (
    <Container>
      <Container className="d-flex justify-content-center">
        <h3>Forecast at {city}, {state}</h3>
      </Container>
      <Container className="mt-3 d-flex justify-content-end">
        <Button variant="secondary" className="white-button"><i className="bi bi-star"></i></Button>
        <span>Details</span>
      </Container>
    </Container>
  )
};