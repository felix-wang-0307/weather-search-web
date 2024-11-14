/**
 * The renderTemperatureRanges function is implemented based on the Highcharts demo:
 * https://www.highcharts.com/demo/highcharts/arearange
 * 
 * The renderCharts function is exported and called with the weeklyWeather and hourlyWeather
 * data, and it renders the temperature ranges and the hourly weather chart.
 */
import { Meteogram } from "./meteogram.js";

export function getTempRangeOptions(weeklyWeather) {
  const dates = weeklyWeather.map(item => new Date(item.startTime).valueOf());  // getTimeStamp
  const temperatureMax = weeklyWeather.map(item => item.values.temperatureMax);
  const temperatureMin = weeklyWeather.map(item => item.values.temperatureMin);
  let data = [];
  for (let i = 0; i < weeklyWeather.length; i++) {
    data.push([dates[i], temperatureMax[i], temperatureMin[i]]);
  }
  // The data array should look like this:
  // [[date1, max1, min1], [date2, max2, min2], ...]
  const options = {
    chart: {
      type: 'arearange',
      zooming: {
        type: 'x'
      },
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1
      }
    },
    title: {
      text: 'Temperature Ranges (Min, Max)'
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: null
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '°F',
      xDateFormat: '%A, %b %e'
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Temperatures',
      data: data,
      marker: {
        fillColor: '#58acf7',  // Set the points to light blue
        lineWidth: 2,
        lineColor: '#58acf7',
        radius: 3
      },
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#ffab00'],
          [1, '#66ccff']
        ]
      },
      lineColor: '#ffab00',  // yellow
      lineWidth: 2          
    }]
  };
  return options;
}

export function getMeteogramProps(hourlyWeather) {
  const meteogram = new Meteogram(hourlyWeather, 'hourly-weather');
  console.log(meteogram);
  return {
    options: meteogram.getChartOptions(),
    callback: chart => meteogram.onChartLoad(chart)
  }
}



