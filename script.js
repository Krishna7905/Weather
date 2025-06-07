const apiKey = "607dc89b45d1691f0ee3e7e49fb43c61";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("search-btn");
const inputField = document.querySelector(".search input");
const errorMessage = document.querySelector(".error-message");
const weatherCard = document.querySelector(".weather-card");
const cityElem = document.querySelector(".city");
const temperatureElem = document.querySelector(".temperature");
const weatherConditionElem = document.querySelector(".condition");
const weatherIconElem = document.querySelector(".weather-icon");
const humiditySpan = document.querySelector(".humidity");
const windSpan = document.querySelector(".wind");

// Weather icons URLs from openweathermap icon API
function getIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

function showError(message) {
  errorMessage.textContent = message;
  weatherCard.style.display = "none";
}

function clearError() {
  errorMessage.textContent = "";
}

function fetchWeather(city) {
  if (!city) return;
  clearError();

  fetch(`${apiUrl}${city}&appid=${apiKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => updateWeather(data))
    .catch(() => showError("City not found! Please try again."));
}

function updateWeather(data) {
  cityElem.textContent = data.name;
  temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
  weatherConditionElem.textContent = data.weather[0].main;
  humiditySpan.textContent = data.main.humidity;
  windSpan.textContent = Math.round(data.wind.speed * 3.6); // m/s to km/h

  weatherIconElem.src = getIconUrl(data.weather[0].icon);
  weatherIconElem.alt = data.weather[0].description;

  weatherCard.style.display = "flex";
  clearError();
}

searchBtn.addEventListener("click", () => {
  fetchWeather(inputField.value.trim());
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather(inputField.value.trim());
  }
});

// Optionally, you can preload some city data or geolocation here
