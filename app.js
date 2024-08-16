import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherCard = document.getElementById("city-stats-card");

const locationIcon = document.getElementById("location-icon");

const forecast = document.getElementById("forecast");

const modalButton = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
  // if (!data) return;
  const weatherJSx = `
  <h1 id="city-name">${data.name},${data.sys.country}</h1>
  <div id="weather-stats">
  <img id="weather-icon" alt="weather icon" src="https://api.openweathermap.org/img/w/${
    data.weather[0].icon
  }.png"/>
  <span class="stats">${data.weather[0].main}</span>
  <p class="temp">${Math.round(data.main.temp)}C</p>
  </div>
  <div class="air-stats">
  <p>Humidity: <span id="humidity">${data.main.humidity}%</span></p>
  <p>Wind Speed : <span id="wind-speed">${data.wind.speed} m/s</span></p>
  </div>
  `;
  weatherCard.innerHTML = weatherJSx;
};

const getWeekDay = (date) => {
  return new Date(date * 1000).getDay();
};

const renderforecastWeather = (data) => {
  // if (!data) return;
  forecast.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSx = `
    <div class='weekDay' >
    <img id="weather-icon" alt="weather icon" src="https://api.openweathermap.org/img/w/${
      i.weather[0].icon
    }.png"/>
    <h3>${DAYS[getWeekDay(i.dt)]}</h3>
    <p>${Math.round(i.main.temp)}C</p>
    <span>${i.weather[0].main}</span>
    </div>
    `;
    forecast.innerHTML += forecastJSx;
  });
};

const searchHandler = async () => {
  weatherCard.style.display = "flex";
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("please enter city name!");
    return;
  }

  const data = await getWeatherData("current", cityName);
  renderCurrentWeather(data);

  const forecastData = await getWeatherData("forecast", cityName);
  renderforecastWeather(forecastData);
};
const positionCallback = async (position) => {
  const currntData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currntData);
  const forecastData = getWeatherData("forecast", position.coords);
  renderforecastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error.message);
};

const locaitionHandler = () => {
  weatherCard.style.display = "flex";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("your browser does not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locaitionHandler);
modalButton.addEventListener("click", removeModal);
