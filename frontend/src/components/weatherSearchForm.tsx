import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useStateSelect from "../hooks/useStateSelect";
import { useCityAutoComplete } from "../hooks/useCityAutoComplete";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./weatherSearchForm.scss";

interface IFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  searchStatus: "init" | "success" | "failed" | "processing";
}

const WeatherSearchForm = ({ onSubmit, onReset, searchStatus }) => {
  const [streetValue, setStreetValue] = useState("");
  const [isStreetValid, setIsStreetValid] = useState(true);
  const {
    CityAutoComplete,
    cityStateValue,
    resetCity,
    ...cityAutoCompleteProps
  } = useCityAutoComplete();
  const { cityValue, isCityValid } = cityAutoCompleteProps;
  const { StateSelect, resetState, ...stateSelectProps } = useStateSelect();
  const { setStateValue, isStateValid } = stateSelectProps;

  const [autoDetect, setAutoDetect] = useState(false);

  const isSearchEnabled = useMemo(() => {
    return (
      searchStatus !== "processing" &&
      ((streetValue && cityValue && isStateValid) || autoDetect)
    );
  }, [searchStatus, streetValue, cityValue, isStateValid, autoDetect]);

  const handleReset = () => {
    onReset(); // Call the onReset function passed as a prop
    setIsStreetValid(true);
    setStreetValue("");
    resetCity();
    resetState();
    setAutoDetect(false);
  };

  useEffect(() => {
    setStateValue(cityStateValue);
  }, [cityStateValue, setStateValue]);

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
              disabled={autoDetect}
              required
              value={streetValue}
              onChange={(e) => setStreetValue(e.target.value)}
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
            <CityAutoComplete
              {...cityAutoCompleteProps}
              disabled={autoDetect}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ display: isCityValid ? "none" : "block" }}
            >
              Please enter a valid city.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-1" controlId="formState">
          <Form.Label column sm={2} xs={12} className="required">
            State
          </Form.Label>
          <Col sm={10} xs={12}>
            <StateSelect {...stateSelectProps} disabled={autoDetect} />
            <Form.Control.Feedback type="invalid">
              Please enter a valid state.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="split-line"></div>

        <Form.Group as={Row} className="mb-3" controlId="formOptions">
          <Container className="d-flex justify-content-center gap-2">
            <Form.Label className="required">Autodetect Location</Form.Label>
            <Form.Check
              type="checkbox"
              label="Current Location"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
            />
          </Container>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Container className="d-flex justify-content-center gap-2">
            <Button
              variant="primary"
              type="submit"
              className="me-2"
              disabled={!isSearchEnabled}
            >
              <i className="bi bi-search"></i>Search
            </Button>
            <Button variant="secondary" className="white-button" type="reset">
              <i className="bi bi-list-nested"></i>Clear
            </Button>
          </Container>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default WeatherSearchForm;
