
import { createContext } from "react";
import { IFormData, IWeatherData } from "./types";

export const AppContext = createContext<[IFormData, IWeatherData]>([{}, {}]);