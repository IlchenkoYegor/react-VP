import axios from "axios";

export const geocode = async (lat, lng) => {
  let lct = lat + ", " + lng;

  const options = {
    method: "GET",
    url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
    params: {
      location: lct,
      language: "en",
    },
    headers: {
      "X-RapidAPI-Key": "55f183bf2cmsh9a1f2501539d224p101654jsn31fa136a5ed1",
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.results[2].locality;
  } catch (er) {
    return "";
  }
};
