import { IController } from "./types";
import { fetchWeatherData, getGeocodeInfo } from "../services";

export const getWeather: IController = async (req, res) => {
  const { latitude, longitude } = req.query as {
    latitude: string;
    longitude: string;
  };
  const data = await fetchWeatherData(latitude, longitude);
  const { statusCode = 200, ...rest } = data;
  res.status(statusCode).json(rest);
}

export const getGeocode: IController = async (req, res) => {
  const { address } = req.query as { address: string };
  const data = await getGeocodeInfo(address);
  const { statusCode = 200, ...rest } = data;
  res.status(statusCode).json(rest);
}