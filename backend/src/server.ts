import express from 'express';
import cors from 'cors';  // Import the CORS package
import * as dotenv from 'dotenv';
import { fetchWeatherData } from "./service";

const FRONTEND_URL = 'https://weather-search-frontend-571.wm.r.appspot.com';
const BACKEND_URL = 'https://weather-search-web-571.wn.r.appspot.com';

dotenv.config();

const app = express();

app.use(cors());
app.use(cors({
  origin: FRONTEND_URL
}));

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/weather', async (req, res) => {
    const { latitude , longitude } = req.query;
    const data = await fetchWeatherData(latitude, longitude);
    res.json(data);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
