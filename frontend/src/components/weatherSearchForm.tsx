import React, { useState, useRef, useCallback } from "react";
import useStateSelect from "../hooks/useStateSelect";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Autocomplete } from "@mui/material";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./weatherSearchForm.scss";

const WeatherSearchForm = ({ onSubmit }) => {
  const [isStreetValid, setIsStreetValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  const { StateSelect, resetState } = useStateSelect();

  const handleReset = () => {
    setIsStreetValid(true);
    setIsCityValid(true);
    resetState();
  };

  return (
    <Container className="mt-sm-4 weather-search-form-container">
      <div className="weather-search-title mb-4 mt-2">
        <h2>Weather Search ⛅</h2>
      </div>
      <Form
        className="weather-search-form"
        onSubmit={onSubmit}
        onReset={handleReset}
        autoComplete="off"
      >
        <Form.Group as={Row} className="mb-1" controlId="formStreet">
          <Form.Label column sm={2} xs={12} className="required">
            Street
          </Form.Label>
          <Col sm={10} xs={12}>
            <Form.Control
              type="text"
              required
              onBlur={(e) => {
                setIsStreetValid(e.target.value.trim() !== "");
              }}
              isInvalid={!isStreetValid}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid street.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-1" controlId="formCity">
          <Form.Label column sm={2} xs={12} className="required">
            City
          </Form.Label>
          <Col sm={10} xs={12}>
            <Form.Control
              type="text"
              required
              onBlur={(e) => {
                setIsCityValid(e.target.value.trim() !== "");
              }}
              isInvalid={!isCityValid}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid city.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-1" controlId="formState">
          <Form.Label column sm={2} xs={12} className="required">
            State
          </Form.Label>
          <Col sm={10} xs={12}>
            <StateSelect />
            <Form.Control.Feedback type="invalid">
              Please enter a valid state.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="split-line"></div>

        <Form.Group as={Row} className="mb-3" controlId="formOptions">
          <Container className="d-flex justify-content-center gap-2">
            <Form.Label className="required">Autodetect Location</Form.Label>
            <Form.Check type="checkbox" label="Current Location" />
          </Container>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Container className="d-flex justify-content-center gap-2">
            <Button variant="primary" type="submit" className="me-2">
              <i className="bi bi-search"></i>Search
            </Button>
            <Button variant="secondary" type="reset">
              <i className="bi bi-list-nested"></i>Clear
            </Button>
          </Container>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default WeatherSearchForm;
