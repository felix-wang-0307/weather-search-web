# weather-search-web
**Application Website: https://weather-search-frontend-571.wm.r.appspot.com/**

A web based weather search app. 
- Front-end: React + Bootstrap;
- Back-end: Node.js and Express

# How to Run and Deploy
## Prerequisites
1. Create two separated projects for front-end and back-end on some cloud platforms (e.g. Google Cloud)
2. Install Node.js on your computer

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
- For Google Cloud, you can use `gcloud app deploy` to deploy the front-end project

# How to get the API keys and 
1. Get the API key from Tomorrow.io by signing up at https://www.tomorrow.io/weather-api/
2. Get the API key from Google Maps by signing up at https://developers.google.com/maps/documentation/javascript/get-api-key
3. Get the API key from IPinfo by signing up at https://ipinfo.io/account/home

## How to get MongoDB URI
1. Get the MongoDB URI from MongoDB Atlas by signing up at https://www.mongodb.com/cloud/atlas
2. Create a new cluster and a new database in MongoDB Atlas
3. Add the IP address of your computer to the IP whitelist in MongoDB Atlas

## Front-end
1. Open your terminal and change the working directory to the `frontend` folder
2. Run `npm install` to install the dependencies (e.g. React) according to `package.json`
3. Run `npm run build` to build the project before your local or cloud deployment
4. Run `npm run start` to start the front-end server
5. Visit `http://localhost:3000` to see the locally deployed front-end
6. Deploy the front-end project to the cloud platform
- For Google Cloud, you can use `gcloud app deploy` to deploy the front-end project

