import express from "express";
import cors from "cors"; // Import the CORS package
import * as dotenv from "dotenv";
import { fetchWeatherData, getGeocodeInfo } from "./service";

const FRONTEND_URL = "https://weather-search-frontend-571.wm.r.appspot.com";
const BACKEND_URL = "https://weather-search-web-571.wn.r.appspot.com";

dotenv.config();

const app = express();

app.use(cors());
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

app.get("/weather", async (req, res) => {
  const { latitude, longitude } = req.query as {
    latitude: string;
    longitude: string;
  };
  const data = await fetchWeatherData(latitude, longitude);
  const { statusCode = 200, ...rest } = data;
  res.status(statusCode).json(rest);
});

app.get("/geocoding", async (req, res) => {
  const { address } = req.query as { address: string };
  const data = await getGeocodeInfo(address);
  const { statusCode = 200, ...rest } = data;
  res.status(statusCode).json(rest);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log(
    `Visit http://localhost:${PORT} (local) or ${BACKEND_URL} (deployed)`
  );
});
