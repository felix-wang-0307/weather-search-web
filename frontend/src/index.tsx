import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { APIProvider } from "@vis.gl/react-google-maps";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

fetch("https://weather-search-web-571.wn.r.appspot.com/google-maps-api-key")
  .then((res) => res.json())
  .then(({ apiKey }) => {
    root.render(
      <React.StrictMode>
        <APIProvider apiKey={apiKey}>
          <App />
        </APIProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to fetch Google Maps API key", error);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
