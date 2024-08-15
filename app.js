const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "ef8196bfc06c52420a7f1bfdc62d1996";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherCard = document.getElementById("city-stats-card");

const locationIcon = document.getElementById("location-icon");

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

const searchHandler = async () => {
  const cityName = searchInput.value;
  const data = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(data);
};
const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currntData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currntData);
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
