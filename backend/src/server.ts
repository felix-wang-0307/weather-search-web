import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  getWeather,
  getGeocode,
  getFavorites,
  addFavorite,
  deleteFavorite,
  getAutoComplete
} from './controllers';

const FRONTEND_URL = "https://weather-search-frontend-571.wm.r.appspot.com";
const BACKEND_URL = "https://weather-search-web-571.wn.r.appspot.com";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

if (process.env.ENV === 'development') {
  app.use(cors(corsOptions)); // Allow CORS for all hosts during development
} else {
  app.use(
    cors({ origin: FRONTEND_URL, credentials: true, ...corsOptions })
  );
}

app.get("/", (req, res) => {
  res.sendFile("info.html", { root: __dirname });
});

app.get("/weather", getWeather);
app.get("/geocoding", getGeocode);
app.get("/favorites", getFavorites);
app.post("/favorites", addFavorite);
app.delete("/favorites", deleteFavorite);
app.get("/autocomplete", getAutoComplete);

app.get("/google-maps-api-key", (req, res) => {
  if (req.headers.origin === FRONTEND_URL) {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY_2 });
  } else {
    res.status(403).json({ error: "Forbidden", message: "Invalid origin" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log(
    `Visit http://localhost:${PORT} (local) or ${BACKEND_URL} (deployed)`
  );
});
