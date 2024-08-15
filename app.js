const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "ef8196bfc06c52420a7f1bfdc62d1996";

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

const getCurrentWeatherByName = (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return fetch(url).then((data) => {
    return data.json();
  });
};
const getCurrentWeatherByCoordinates = (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return fetch(url).then((data) => {
    return data.json();
  });
};

const get5DayForecastByCoordinates = (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return fetch(url).then((data) => {
    return data.json();
  });
};
const get5DayForecastByName = (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  return fetch(url).then((data) => {
    return data.json();
  });
};

const renderCurrentWeather = (data) => {
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
  const cityName = searchInput.value;

  if (!cityName) {
    alert("please enter city name!");
  }

  const data = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(data);

  const forecastData = await get5DayForecastByName(cityName);
  renderforecastWeather(forecastData);
};
const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currntData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currntData);
  const forecastData = get5DayForecastByCoordinates(latitude, longitude);
  renderforecastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error.message);
};

const locaitionHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("your browser does not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locaitionHandler);
