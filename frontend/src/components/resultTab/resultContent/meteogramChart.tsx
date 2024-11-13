import React, { useContext } from "react";
import Highcharts from "highcharts";
import WindBarb from "highcharts/modules/windbarb";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";
import { getMeteogramProps } from "./charts/renderCharts";
import { AppContext } from "../../../appContext";
import { IWeatherDetails } from "@/types";

HighchartsMore(Highcharts);
WindBarb(Highcharts);

export default function MeteogramChart () {
  const weatherData = useContext(AppContext)[1];
  let hourlyWeather: IWeatherDetails[] = [];
  const hourlyTimeline = weatherData?.timelines?.find(
    (timeline) => timeline.timestep === "1h"
  );
  if (hourlyTimeline) {
    hourlyWeather = hourlyTimeline.intervals;
  }
  const { options, callback } = getMeteogramProps(hourlyWeather);
  return (
    <Container className="border-top">
      <HighchartsReact highcharts={Highcharts} options={options} callback={callback} />
    </Container>
  )
}