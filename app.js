const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "ef8196bfc06c52420a7f1bfdc62d1996";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const getCurrentWeatherByName = (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log(url);
  return fetch(url).then((data) => {
    return data.json();
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  const data = await getCurrentWeatherByName(cityName);
};

searchButton.addEventListener("click", searchHandler);
