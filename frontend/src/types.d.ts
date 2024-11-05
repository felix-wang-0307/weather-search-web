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