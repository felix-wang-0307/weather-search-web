export interface IFormData {
	street: string;
	city: string;
	state: string;
	autoDetect: boolean;
}
export interface IGeocodingData {
	locationString: string;
	latitude: number;
	longitude: number;
}

export interface ICityInfo {
  city: string;
  state: string;
}

export interface IWeatherDetails {
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

export interface IWeatherTimeline {
  timestep: "1d" | "1h" | "current";
  startTime: string;
  endTime: string;
  intervals: IWeatherDetails[];
}

export interface IWeatherData {
  timelines: IWeatherTimeline[];
  warnings: any[];
}