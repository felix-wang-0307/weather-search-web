import React, { useContext } from "react";
import DetailHeader from "./detailHeader";
import DayWeatherTable from "./dayWeatherTable";
import { Container } from "react-bootstrap";
import { AppContext } from "../../../appContext";

export default function ResultDetails({ goBackToContent, detailDate }) {
  const weatherData = useContext(AppContext)[1];
  const dailyWeather = weatherData.timelines?.find(
    (timeline) => timeline.timestep === "1d"
  );
  const dayWeather = dailyWeather?.intervals.find(
    (interval) => interval.startTime === detailDate
  );

  return (
    <Container>
      <DetailHeader goBackToContent={goBackToContent} detailDate={detailDate} />
      {dayWeather && <DayWeatherTable dayWeather={dayWeather} />}
    </Container>
  );
}
