import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "ef8196bfc06c52420a7f1bfdc62d1996";

const getWeatherData = async (type, data) => {
  let url = null;
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    default:
      url = `${BASE_URL}/weather?q=tehran&appid=${API_KEY}&units=metric`;
      break;
  }
  return fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      if (json.cod === 200) {
        return json;
      } else {
        alert(json.message);
      }
    })
    .catch((error) => {
      alert("An error occured when fetching data");
    });
};

export default getWeatherData;
