import { createContext } from "react";
import { IFormData, IWeatherData, IGeocodingData } from "./types";

export const AppContext = createContext<
  [IFormData, IWeatherData, IGeocodingData]
>([{} as IFormData, {} as IWeatherData, {} as IGeocodingData]);
