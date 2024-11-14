import { AppContext } from "../../../appContext";
import { IWeatherData, IWeatherDetails } from "@/types";
import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { convertDate } from "../../../utils";
import weatherCodes from "../../../data/weatherCodes.json";
import { SlideContext } from "..";

const DayViewTable = ({
  weeklyWeather,
}: {
  weeklyWeather: IWeatherDetails[];
}) => {
  const { goToDetails, goBackToContent } = useContext(SlideContext);
  return (
    <Container className="table">
      <Row className="table-header">
        <Col xs={1}>#</Col>
        <Col sm={3} xs={2}>
          Date
        </Col>
        <Col sm={2} xs={3}>
          Status
        </Col>
        <Col xs={2}>Temp. High(°F)</Col>
        <Col xs={2}>Temp. Low(°F)</Col>
        {/* If it is xs-sized-device, show "Wind Speed" without (mph) */}
        <Col sm={2} className="d-none d-sm-block">
          Wind Speed(mph)
        </Col>
        <Col xs={2} className="d-block d-sm-none">
          Wind Speed
        </Col>
      </Row>
      {weeklyWeather.map((day: IWeatherDetails, index: number) => (
        <Row className="table-row" key={index}>
          <Col xs={1}>{index + 1}</Col>
          <Col
            sm={3}
            xs={2}
            className="link"
            onClick={() => goToDetails(day.startTime)}
          >
            {convertDate(day.startTime)}
          </Col>
          <Col sm={2} xs={3}>
            <img
              src={weatherCodes[day.values.weatherCode].icon}
              alt="icon"
              style={{
                width: "50px",
                height: "50px",
                margin: "-10px -5px",
              }}
            />
            {weatherCodes[day.values.weatherCode].desc}
          </Col>
          <Col xs={2}>{day.values.temperatureMax}</Col>
          <Col xs={2}>{day.values.temperatureMin}</Col>
          <Col xs={2}>{day.values.windSpeed}</Col>
        </Row>
      ))}
    </Container>
  );
};

export default function DayView() {
  const weatherData: IWeatherData = useContext(AppContext)[1];
  const weeklyWeather = weatherData.timelines?.find(
    (timeline) => timeline.timestep === "1d"
  )?.intervals;
  return (
    (weeklyWeather && <DayViewTable weeklyWeather={weeklyWeather} />) || (
      <Alert variant="warning" className="mt-3">
        No day view data available
      </Alert>
    )
  );
}
