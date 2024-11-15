# weather-search-web
**Application Front-end Website: https://weather-search-frontend-571.wm.r.appspot.com/**

A web based weather search app: provide weather information for any location in the world. The app allows users to search for weather information by city name, or current location. The app displays the current weather, hourly weather, and daily weather for the searched location. The app also provides a map with the location of the searched location and the user's current location. The app is responsive and can be used on **desktop**, **tablet** and **mobile** devices.

## Technologies
- Front-end: [React](https://react.dev/), [Bootstrap](https://getbootstrap.com/), [Material-UI](https://material-ui.com/), [Highcharts](https://www.highcharts.com/);
- Back-end: Node.js, [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Tomorrow.io API](https://www.tomorrow.io/), [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview), [IPinfo API](https://ipinfo.io/).

# How to Run and Deploy
## Prerequisites
1. Create two separated projects for front-end and back-end on some cloud platforms (e.g. Google Cloud)
2. Install Node.js on your computer

## Front-end
1. Open your terminal and change the working directory to the `frontend` folder
2. Run `npm install` to install the dependencies (e.g. React) according to `package.json`
3. Run `npm run start` to start the front-end server
4. Visit `http://localhost:3000` to see the locally deployed front-end
5. Run `npm run build` to build the front-end project before deploying it to the cloud platform
6. Deploy the front-end project to the cloud platform or locally
- For Google Cloud, you can use `gcloud app deploy` to deploy the front-end project
- For Local, you can use `serve -s build` to deploy the front-end project

## Back-end
1. Open your terminal and change the working directory to the `backend` folder
2. Create a `.env` file in the `backend` folder and add the following content:
```
FRONTEND_URL=your_frontend_url
TOMORROW_API_KEY=your_tomorrow_api_key
MONGODB_URI=your_mongodb_uri
GOOGLE_MAPS_API_KEY=your_google_map_api_key
IPINFO_TOKEN=your_ipinfo_token
FRONTEND_URL=https://weather-search-frontend-571.wm.r.appspot.com or your_frontend_url
```

Remember to replace `your_frontend_url`, `your_tomorrow_api_key`, `your_mongodb_uri`, `your_google_map_api_key`, and `your_ipinfo_token` with your own values. See the next section for how to get the API keys and MongoDB URI.

3. Run `npm install` to install the dependencies (e.g. Express) according to `package.json`
4. Run `tsc` or `npm run build` to compile TypeScript files to JavaScript files
5. Check if `dist` folder is created and contains compiled JavaScript files
6. Run `npm run start` to start the back-end server
7. Visit `http://localhost:8080` to see the locally deployed back-end
- For Google Cloud, you can use `gcloud app deploy` to deploy the front-end project

## How to get the API keys
1. Get the API key from Tomorrow.io by signing up at https://www.tomorrow.io/weather-api/
2. Get the API key from Google Maps by signing up at https://developers.google.com/maps/documentation/javascript/get-api-key
3. Get the API key from IPinfo by signing up at https://ipinfo.io/account/home

## How to get MongoDB URI
1. Get the MongoDB URI from MongoDB Atlas by signing up at https://www.mongodb.com/cloud/atlas
2. Create a new cluster and a new database in MongoDB Atlas
3. Add the IP address of your computer to the IP whitelist in MongoDB Atlas



