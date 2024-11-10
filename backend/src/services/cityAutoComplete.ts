import { appendParams } from "./utils";

interface ICityAutoCompleteResponse {
  success: boolean;
  data?: ICityInfo[];
  error?: string;
  statusCode?: number;
}

interface ICityInfo {
  city: string;
  state: string;
}

const AUTO_COMPLETE_API =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";

export async function getAutoCompleteList(
  input: string
): Promise<ICityAutoCompleteResponse> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";
  try {
    const params = {
      input,
      key: apiKey,
      type: "(cities)",
      language: "en",
    };
    const data = await fetch(appendParams(AUTO_COMPLETE_API, params)).then(
      (res) => res.json()
    );
    const status = data?.status || "";
    const predictions = data?.predictions || [];
    if (status !== "OK" && status !== "ZERO_RESULTS") {
      throw new Error("Failed to fetch autocomplete data");
    }
    const cityInfo: ICityInfo[] = predictions.map((prediction: any) => {
      const city = prediction.structured_formatting.main_text;
      const state = prediction.structured_formatting.secondary_text.split(", ")[0];
      return { city, state };
    });
    return { success: true, data: cityInfo, statusCode: 200 };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      statusCode: 500,
    };
  }
}
