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

interface ICityInfo {
  city: string;
  state: string;
}

export interface IWeatherData {

}