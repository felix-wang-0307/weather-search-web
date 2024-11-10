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
    const data = await fetch(
      `${AUTO_COMPLETE_API}?input=${input}&key=${apiKey}`
    ).then((res) => res.json());
    const status = data?.status || "";
    if (status !== "OK" && status !== "ZERO_RESULTS") {
      throw new Error("Failed to fetch autocomplete data");
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      statusCode: 500,
    };
  }
}
