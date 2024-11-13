/**
 * The file is based on the meteogram chart demo from Highcharts: 
 * https://www.highcharts.com/demo/highcharts/combo-meteogram
 * 
 * This is the main file for the meteogram chart. The functionality is as follows:
 * - Loads weather forecast from https://tomorrow.io in form of a JSON service.
 * - When the data arrives async, a Meteogram instance is created. We have
 *   created the Meteogram prototype to provide an organized structure of the
 *   different methods and subroutines associated with the demo.
 * - The parseHourlyWeatherData method parses the data from https://tomorrow.io into several parallel
 *   arrays. These arrays are used directly as the data option for temperature,
 *   precipitation and air pressure.
 * - After this, the options structure is built, and the chart generated with
 *   the parsed data.
 * - On chart load, weather statistics and the frames for the wind arrows are
 *   rendered using custom logic.
 */
import Highcharts from 'highcharts';

class Meteogram {
  constructor(json) {
    // Parallel arrays for the chart data, these are populated as the JSON file
    // is loaded
    this.humidities = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.json = json;

    // Run
    this.parseHourlyWeatherData();
  }
  /**
   * Draw blocks around wind arrows, below the plot area
   */
  drawBlocksForWindArrows(chart) {
    const xAxis = chart.xAxis[0];

    for (let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5,
      i += 1) {

      // Get the X position
      const isLast = pos === max + 36e5, x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

      // Draw the vertical dividers and ticks
      const isLong = this.resolution > 36e5 ?
        pos % this.resolution === 0 :
        i % 2 === 0;

      chart.renderer
        .path([
          'M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
          'L', x, chart.plotTop + chart.plotHeight + 32,
          'Z'
        ])
        .attr({
          stroke: chart.options.chart.plotBorderColor,
          'stroke-width': 1
        })
        .add();
    }

    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
      translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });
  }
  /**
   * Build and return the Highcharts options structure
   */
  getChartOptions() {
    return {
      chart: {
        marginBottom: 70,
        marginRight: 40,
        marginTop: 50,
        plotBorderWidth: 1,
        height: 410,
        alignTicks: false,
        scrollablePlotArea: {
          minWidth: 720
        }
      },

      defs: {
        patterns: [{
          id: 'precipitation-error',
          path: {
            d: [
              'M', 3.3, 0, 'L', -6.7, 10,
              'M', 6.7, 0, 'L', -3.3, 10,
              'M', 10, 0, 'L', 0, 10,
              'M', 13.3, 0, 'L', 3.3, 10,
              'M', 16.7, 0, 'L', 6.7, 10
            ].join(' '),
            stroke: '#68CFE8',
            strokeWidth: 1
          }
        }]
      },

      title: {
        text: 'Hourly Weather (For Next 5 Days)',
        align: 'center',
        style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      },

      credits: {
        text: 'Forecast from <a href="https://tomorrow.io">tomorrow.io</a>',
        href: 'https://tomorrow.io',
        position: {
          x: -40
        }
      },

      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.x:%A, %b %e, %H:%M}</small><br>' +
          '<b>{point.point.symbolName}</b><br>'
      },

      xAxis: [{
        type: 'datetime',
        tickInterval: 8 * 36e5, // 8 hours
        minorTickInterval: 36e5, // one hour
        tickLength: 0,
        gridLineWidth: 1,
        gridLineColor: 'rgba(128, 128, 128, 0.1)',
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        offset: 30,
        showLastLabel: true,
        labels: {
          format: '{value:%H}',
        },
        crosshair: true
      }, {
        linkedTo: 0,
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: '{value:<span style="font-size: 12px; font-weight: ' +
            'bold">%a</span> %b %e}',
          align: 'left',
          x: 3,
          y: 8
        },
        opposite: true,
        tickLength: 20,
        gridLineWidth: 1
      }],

      yAxis: [{
        title: {
          text: null
        },
        labels: {
          format: '{value}°',
          style: {
            fontSize: '10px'
          },
          x: -3
        },
        plotLines: [{
          value: 0,
          color: '#BBBBBB',
          width: 1,
          zIndex: 2
        }],
        maxPadding: 0.3,
        minRange: 8,
        tickInterval: 1,
        gridLineColor: 'rgba(128, 128, 128, 0.1)'
      }, {
        title: {
          text: null
        },
        labels: {
          format: '{value} %',
          enabled: false
        },
        gridLineWidth: 0,
        tickLength: 0,
        minRange: 10,
        min: 0
      }, {
        allowDecimals: false,
        title: {
          text: 'inHg',
          offset: 0,
          align: 'high',
          rotation: 0,
          style: {
            fontSize: '10px',
            color: "#ffab00"
          },
          textAlign: 'left',
          x: 3
        },
        labels: {
          style: {
            fontSize: '8px',
            color: "#ffab00"
          },
          y: 2,
          x: 3
        },
        gridLineWidth: 0,
        opposite: true,
        showLastLabel: false
      }],

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          pointPlacement: 'between'
        }
      },


      series: [{
        name: 'Temperature',
        data: this.temperatures,
        type: 'spline',
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true
            }
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span>' +
            ' ' +
            '{series.name}: <b>{point.y}°F</b><br/>'
        },
        zIndex: 1,
        color: '#FF3333',
        negativeColor: '#48AFE8'
      }, {
        name: 'Humidity',
        data: this.humidities,
        type: 'column',
        color: '#96cbf9',
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        grouping: false,
        dataLabels: {
          enabled: true,
          filter: {
            operator: '>',
            property: 'y',
            value: 0
          },
          style: {
            fontSize: '8px',
            color: '#666'
          }
        },
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        name: 'Air pressure',
        color: "#ffab00",
        data: this.pressures,
        marker: {
          enabled: false
        },
        shadow: false,
        tooltip: {
          valueSuffix: ' inHg'
        },
        dashStyle: 'shortdot',
        yAxis: 2
      }, {
        name: 'Wind',
        type: 'windbarb',
        id: 'windbarbs',
        color: Highcharts.getOptions().colors[1],
        lineWidth: 1.5,
        data: this.winds,
        vectorLength: 12,
        yOffset: -15,
        xOffset: -5,
        tooltip: {
          valueSuffix: ' m/s'
        }
      }]
    };
  }
  /**
   * Post-process the chart from the callback function, the second argument
   * Highcharts.Chart.
   */
  onChartLoad(chart) {
    this.drawBlocksForWindArrows(chart);
  }
  /**
   * Create the chart. This function is called async when the data file is loaded
   * and parsed.
   */
  createChart() {
    this.chart = new Highcharts.Chart(this.getChartOptions(), chart => {
      this.onChartLoad(chart);
    });
  }
  callback(chart) {
    return this.onChartLoad(chart);
  }
  error() {
    document.getElementById('loading').innerHTML =
      '<i class="fa fa-frown-o"></i> Failed loading data, please try again ' +
      'later';
  }
  /**
   * Handle the data. This part of the code is not Highcharts specific, but deals
   * with tomorrow.io's specific data format
   * See https://docs.tomorrow.io/reference/data-layers-overview for more info
   */
  parseHourlyWeatherData() {
    if (!this.json) {
      return this.error();
    }
    let i = 0;
    for (let item of this.json) {
      const values = item.values;
      const startTime = new Date(item.startTime);
      startTime.setHours(startTime.getHours() - 7); // Convert to Los Angeles time
      const x = startTime.valueOf(); // get the timestamp
      this.humidities.push({ x, y: parseInt(values.humidity) });
      if (i % 2 === 0) {
        this.winds.push({
          x,
          value: values.windSpeed,
          direction: values.windDirection
        });
      }
      this.pressures.push({ x, y: values.pressureSeaLevel });
      this.temperatures.push({ x, y: values.temperature });
      i++;
    }

    // Create the chart when the data is loaded
    // this.createChart();
  }
}
// End of the Meteogram prototype

export { Meteogram };