/// <reference path="./weatherService.d.ts" />
const WEATHER_API = "https://api.tomorrow.io/v4/timelines";
const GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/geocode/json";

function isValidLatitude(latitude: string): boolean {
  try {
    const lat = parseFloat(latitude);
    return lat >= -90 && lat <= 90;
  } catch (error) {
    return false;
  }
}

function isValidLongitude(longitude: string): boolean {
  try {
    const lon = parseFloat(longitude);
    return lon >= -180 && lon <= 180;
  } catch (error) {
    return false;
  }
}

export async function fetchWeatherData(
  latitude: string,
  longitude: string,
  options: IWeatherOptions
): Promise<IResponse<IWeatherData>> {
  // console.log("Incoming request for weather data:", latitude, longitude);
  if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
    return {
      success: false,
      error: "Invalid latitude or longitude",
      statusCode: 400,
    };
  }

  const apiKey = process.env.TOMORROW_API_KEY || "";
  const params = new URLSearchParams({
    location: `${latitude},${longitude}`,
    apikey: apiKey,
    fields: [
      "temperature",
      "temperatureApparent",
      "temperatureMin",
      "temperatureMax",
      "windSpeed",
      "windDirection",
      "humidity",
      "pressureSeaLevel",
      "uvIndex",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "sunriseTime",
      "sunsetTime",
      "visibility",
      "moonPhase",
      "cloudCover",
    ].join(","),
    units: options.units || "metric",
    timesteps: ["current", "1h", "1d"].join(","),
  });

  if (options.timezone) {
    params.set("timezone", options.timezone);
  }

  try {
    const response = await fetch(`${WEATHER_API}?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data from primary API key");
    }
    const data = await response.json();

    // TODO: Remove the following code
    // const address = await getGeocodeInfo(`${latitude},${longitude}`).then(
    //   (response) => response.data?.formattedAddress
    // );
    // const city = address?.split(",")[1];
    // // @ts-ignore
    // data.city = city;

    // END OF TODO

    return {
      success: true,
      data: data.data,
      // message:
      //   "The fields are imperial units, and the time zone is hardcoded as America/Los_Angeles.",
    };
  } catch (error) {
    console.error(
      "Failed to fetch weather data from primary API key, trying failover",
      error
    );
    const failoverApiKey = process.env.TOMORROW_API_FAILOVER_KEY || "";
    params.set("apikey", failoverApiKey);

    try {
      const response = await fetch(`${WEATHER_API}?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data from failover API key");
      }
      const data: IWeatherData = await response.json().then((data) => data.data);

      // TODO: Remove the following code
      // const address = await getGeocodeInfo(`${latitude},${longitude}`).then(
      //   (response) => response.data?.formattedAddress
      // );
      // const city = address?.split(",")[1];
      // // @ts-ignore
      // data.city = city;

      // END OF TODO
      return {
        success: true,
        data,
        message:
          "Data fetched from failover API key. The fields are imperial units, and the time zone is hardcoded as America/Los_Angeles.",
      };
    } catch (failoverError) {
      console.error(
        "Failed to fetch weather data from failover API key",
        failoverError
      );
      return {
        success: false,
        error: "Failed to fetch weather data",
        statusCode: 500,
      };
    }
  }
}

export async function getGeocodeInfo(
  address: string
): Promise<IResponse<IGeocodeInfo>> {
  try {
    const params = new URLSearchParams({
      address,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    });
    const response = await fetch(`${GOOGLE_MAPS_API}?${params}`, {
      headers: {
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch geocode information");
    }

    const data = await response.json();
    const results = data.results;
    if (results && results.length > 0) {
      const result = results[0];
      const coordinates = result.geometry.location;
      const formattedAddress = result.formatted_address;

      return {
        statusCode: 200,
        success: true,
        data: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          formattedAddress,
        },
      };
    } else {
      return {
        statusCode: 500,
        success: false,
        error: "Failed to fetch address info",
      };
    }
  } catch (error) {
    console.error("Error fetching geocode information:", error);
    return {
      statusCode: 500,
      success: false,
      error: "Failed to fetch address info",
    };
  }
}
