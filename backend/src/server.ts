import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {
  getWeather,
  getGeocode,
  getFavorites,
  addFavorite,
  deleteFavorite,
} from './controllers';

const FRONTEND_URL = "https://weather-search-frontend-571.wm.r.appspot.com";
const BACKEND_URL = "https://weather-search-web-571.wn.r.appspot.com";

dotenv.config();

const app = express();

app.use(
  cors({ origin: FRONTEND_URL, credentials: true })
);

app.get("/", (req, res) => {
  res.sendFile("info.html", { root: __dirname });
});

app.get("/weather", getWeather);
app.get("/geocoding", getGeocode);
app.get("/favorites", getFavorites);
app.post("/favorites", addFavorite);
app.delete("/favorites", deleteFavorite);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log(
    `Visit http://localhost:${PORT} (local) or ${BACKEND_URL} (deployed)`
  );
});
