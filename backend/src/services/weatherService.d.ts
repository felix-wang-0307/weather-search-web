interface IResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

interface IGeocodeInfo {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

interface IWeatherDetails {
  startTime: string;
  values: {
    temperature: number;
    temperatureApparent: number;
    temperatureMin: number;
    temperatureMax: number;
    windSpeed: number;
    windDirection: number;
    humidity: number;
    pressureSeaLevel: number;
    uvIndex: number;
    weatherCode: number;
    precipitationProbability: number;
    precipitationType: number;
    sunriseTime: string;
    sunsetTime: string;
    visibility: number;
    moonPhase: number;
    cloudCover: number;
  }
}

interface IWeatherTimeline {
  timestep: "1d" | "1h" | "current";
  startTime: string;
  endTime: string;
  intervals: IWeatherDetails[];
}

interface IWeatherData {
  timelines: IWeatherTimeline[];
  warnings: any[];
}

