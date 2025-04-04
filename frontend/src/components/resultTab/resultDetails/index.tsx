import React, { useContext } from "react";
import DetailHeader from "./detailHeader";
import DayWeatherTable from "./dayWeatherTable";
import { Container } from "react-bootstrap";
import { AppContext } from "../../../appContext";
import DayWeatherMap from "./dayWeatherMap";
import { SlideContext } from "..";

export default function ResultDetails() {
  const [{ city = "", state = "" }, weatherData, geocodingData] = useContext(AppContext);
  const { goBackToContent, detailDate } = useContext(SlideContext);
  const dailyWeather = weatherData.timelines?.find(
    (timeline) => timeline.timestep === "1d"
  );
  const dayWeather = dailyWeather?.intervals.find(
    (interval) => interval.startTime === detailDate
  );

  return (
    <Container>
      {dayWeather && (
        <>
          <DetailHeader
            goBackToContent={goBackToContent}
            dayWeather={dayWeather}
            cityInfo={{ city, state }}
          />
          <DayWeatherTable dayWeather={dayWeather} />
          <DayWeatherMap geocodingData={geocodingData} />
        </>
      )}
    </Container>
  );
}
