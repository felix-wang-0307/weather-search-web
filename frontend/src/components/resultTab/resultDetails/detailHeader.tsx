import { ICityInfo, IWeatherDetails } from "@/types";
import { convertDate, convertDate2 } from "../../../utils";
import React from "react";
import { Button, Container } from "react-bootstrap";
import weatherCode from "../../../data/weatherCodes.json";
import "./detailHeader.scss";
interface IDetailHeaderProps {
  goBackToContent: () => void;
  dayWeather: IWeatherDetails;
  cityInfo: ICityInfo;
}

export default function DetailHeader({
  goBackToContent,
  dayWeather,
  cityInfo,
}: IDetailHeaderProps) {
  const { startTime, values } = dayWeather;

  // Tweet Content Example:
  // The temperature in Los Angeles, California on Thursday, Oct. 10, 2024 is 75°F.
  // The weather conditions are Clear #CSCI571WeatherSearch
  let tweetContent = `The temperature in ${cityInfo.city}, ${cityInfo.state} `;
  tweetContent += `on ${convertDate2(startTime)} `;
  tweetContent += `is ${values.temperatureApparent}°F. `;
  tweetContent += `The weather conditions are ${
    weatherCode[values.weatherCode].desc
  } `;
  tweetContent += `#CSCI571WeatherSearch`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}`;

  return (
    <Container className="head d-flex justify-content-between">
      <Button onClick={goBackToContent} className="go-back-button">
        <i className="bi bi-chevron-left"></i>List
      </Button>
      <h2>{convertDate(startTime)}</h2>
      <Button
        as="a"
        className="tweet-button"
        href={tweetUrl}
      >
        <i className="bi bi-twitter-x"></i>
      </Button>
    </Container>
  );
}
