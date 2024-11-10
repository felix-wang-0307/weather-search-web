import React, { useState, useEffect, useMemo, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./weatherSearchForm.scss";
import { Autocomplete } from "@mui/material";
import states from "./states.json";

const WeatherSearchForm = ({ onSubmit }) => {
  const [isStreetValid, setIsStreetValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);
  return (
    <Container className="mt-4 weather-search-form-container">
      <div className="weather-search-title mt-2 mb-4">
        <h2>Weather Search ⛅</h2>
      </div>
      <Form className="weather-search-form" onSubmit={onSubmit}>
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
            <Autocomplete
              freeSolo
							autoComplete={false}
              id="state-select"
              disableClearable
              options={Object.keys(states)}
              renderInput={(params) => {
								return (
									<div ref={params.InputProps.ref} className="">
										<input {...params.inputProps} type="text" className="form-control"/>
									</div>
								)
							}}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    {option}
                  </li>
                );
              }}
            />
          </Col>
        </Form.Group>

        <div className="split-line"></div>

        <Form.Group as={Row} className="mb-3" controlId="formOptions">
          <Col sm={{ span: 10, offset: 2 }} xs={12}>
            <Form.Check type="checkbox" label="Autodetect Location" />
          </Col>
        </Form.Group>

        {/* Buttons */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }} xs={12}>
            <Button variant="primary" type="submit" className="me-2">
              Search
            </Button>
            <Button variant="secondary" type="reset">
              Clear
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default WeatherSearchForm;
