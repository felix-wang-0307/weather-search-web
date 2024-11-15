import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import weatherCode from "../../../data/weatherCodes.json";
import { IWeatherDetails } from "@/types";
import "./dayWeatherTable.scss";
import { getTimeOfDay } from "../../../utils";

interface IDayWeatherTableProps {
  dayWeather: IWeatherDetails;
}

export default function DayWeatherTable({ dayWeather }: IDayWeatherTableProps) {
  const { values } = dayWeather;
  return (
    <Container className="table mt-3">
      <Row className="day-weather-table-row">
        <Col xs={4}>Status</Col>
        <Col xs={8}>{weatherCode[values.weatherCode].desc}</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Max Temperature</Col>
        <Col xs={8}>{values.temperatureMax}°F</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Min Temperature</Col>
        <Col xs={8}>{values.temperatureMin}°F</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Apparent Temperature</Col>
        <Col xs={8}>{values.temperatureApparent}°F</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Sun Rise Time</Col>
        <Col xs={8}>{getTimeOfDay(values.sunriseTime)}</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Sun Set Time</Col>
        <Col xs={8}>{getTimeOfDay(values.sunsetTime)}</Col>
      </Row>
      <Row className="day-weather-table-row" >
        <Col xs={4}>Humidity</Col>
        <Col xs={8}>{values.humidity}%</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Wind Speed</Col>
        <Col xs={8}>{values.windSpeed} mph</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Visibility</Col>
        <Col xs={8}>{values.visibility} mi</Col>
      </Row>
      <Row className="day-weather-table-row">
        <Col xs={4}>Cloud Cover</Col>
        <Col xs={8}>{values.cloudCover}%</Col>
      </Row>
    </Container>
  );
}
