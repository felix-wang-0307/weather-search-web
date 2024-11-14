import { IFormData, IGeocodingData, IWeatherData } from "@/types";
import { abbreviationToState } from "../utils";

const BACKEND = "https://weather-search-web-571.wn.r.appspot.com/";

export async function fetchData(formData: IFormData): Promise<{
	city: string;
	state: string;
	weather: IWeatherData;
  geocoding: IGeocodingData;
}> {
  const { autoDetect } = formData;
  if (autoDetect) {
    // Fetch the user's location based on their IP address
    const geocoding = await fetchIpInfo();
    const { locationString, latitude, longitude } = geocoding;
    const weather = await fetchWeather(latitude, longitude);
    return { ...extractCityState(locationString), weather, geocoding };
  } else {
    // Fetch the user's location based on the form input
    const geocoding = await fetchGeocoding(formData);
    // Destructure the latitude, longitude, and formattedAddress properties from the geocoding object
    const { latitude, longitude, formattedAddress } = geocoding;
    const weather = await fetchWeather(latitude, longitude);
    return { ...extractCityState(formattedAddress), weather, geocoding };
  }
}

async function fetchIpInfo(): Promise<IGeocodingData> {
  const ipInfo = await fetch("https://ipinfo.io/json").then((res) =>
    res.json()
  );
  const { city, region, country, postal, loc } = ipInfo;
  const locationString: string = `${city}, ${region} ${postal}, ${country}`;
  const [latitude, longitude] = loc.split(",").map(parseFloat);
  return { locationString, latitude, longitude };
}

async function fetchGeocoding(
  formData: IFormData
): Promise<IGeocodingData & { formattedAddress: string }> {
  const { street, city, state } = formData;
  const address = `${street}, ${city}, ${state}`;
  const url = `${BACKEND}/geocoding?address=${address}`;
  const data = await fetch(url).then((response) => response.json());
  if (!data.success) {
    throw new Error("Failed to fetch geocoding data");
  }
  return data.data;
}

async function fetchWeather(latitude: number, longitude: number): Promise<IWeatherData> {
  const url = `${BACKEND}/weather?latitude=${latitude}&longitude=${longitude}&`;
  const data = await fetch(url).then((response) => response.json());
  if (!data.success || !data.data?.timelines?.length) {
    throw new Error("Failed to fetch weather data");
  }
  return data.data;
}

function extractCityState(locationString: string): { city: string; state: string } {
	// locationString is like "[USC (optional), ]Los Angeles, CA 90007, USA"
	const partitions = locationString.split(", ");
	const city = partitions[partitions.length - 3];  // "Los Angeles"
	const stateValue = partitions[partitions.length - 2].split(" ")[0];  // "CA" or "California"
	const state = abbreviationToState(stateValue) || stateValue;  // "California"
	return { city, state };
}
