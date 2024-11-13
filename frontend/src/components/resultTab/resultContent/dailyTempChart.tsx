import React, { useContext } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";
import { getTempRangeOptions } from "./charts/renderCharts";
import { AppContext } from "../../../appContext";
import { IWeatherDetails } from "@/types";

HighchartsMore(Highcharts);

export function DailyTempChart() {
  const weatherData = useContext(AppContext)[1];
  let weeklyWeather: IWeatherDetails[] = [];

  const dailyTimeline = weatherData?.timelines?.find(
    (timeline) => timeline.timestep === "1d"
  );
  if (dailyTimeline) {
    weeklyWeather = dailyTimeline.intervals;
  }

  const tempRangeOptions = getTempRangeOptions(weeklyWeather);

  return (
    <Container className="border-top">
      <HighchartsReact highcharts={Highcharts} options={tempRangeOptions} />
    </Container>
  );
}
