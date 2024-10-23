import express from 'express';
import cors from 'cors';  // Import the CORS package
import * as dotenv from 'dotenv';
import { run } from './mongodb';

const FRONTEND_URL = 'https://weather-search-frontend-571.wm.r.appspot.com';
const BACKEND_URL = 'https://weather-search-web-571.wn.r.appspot.com';

dotenv.config();

run(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
});

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Example: Restrict CORS to specific frontend URL (change to your frontend URL)
app.use(cors({
    origin: FRONTEND_URL
}));

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

app.get('/test', (req, res) => {
    const params = req.query;
    res.json({
        message: 'Hello from App Engine!',
        params
    });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
