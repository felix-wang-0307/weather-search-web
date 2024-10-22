import express from 'express';
import * as dotenv from 'dotenv';
import { run } from './mongodb';
dotenv.config();
const uri = process.env.MONGODB_URI;
console.log(uri);
run(uri).then(() => {console.log('Connected to MongoDB')});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});