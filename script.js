const apiKey = "607dc89b45d1691f0ee3e7e49fb43c61";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("search-btn");
const inputField = document.querySelector(".search-wrapper input");
const errorMessage = document.querySelector(".error-message");
const weatherCard = document.querySelector(".weather-card");
const cityElem = document.querySelector(".city");
const temperatureElem = document.querySelector(".temperature");
const weatherConditionElem = document.querySelector(".weather-condition");
const weatherIconElem = document.querySelector(".weather-icon");
const humiditySpan = document.querySelector(".humidity");
const windSpan = document.querySelector(".wind");

/* Fetch weather data from the API */
function fetchWeather(city) {
  fetch(apiUrl + city + "&appid=" + apiKey)
    .then(response => {
      if (response.status !== 200) {
        errorMessage.style.display = "block";
        weatherCard.style.display = "none";
        throw new Error("City not found");
      }
      errorMessage.style.display = "none";
      return response.json();
    })
    .then(data => {
      updateWeather(data);
    })
    .catch(error => console.error("Error fetching weather:", error));
}

/* Update the UI and store the last searched city */
function updateWeather(data) {
  cityElem.textContent = data.name;
  temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
  humiditySpan.textContent = `${data.main.humidity}%`;
  windSpan.textContent = `${data.wind.speed} Km/h`;
  weatherConditionElem.textContent = data.weather[0].main;

  // Map weather conditions to icon filenames
  const weatherIcons = {
    Clear: "clear.png",
    Clouds: "cloud.png",
    Drizzle: "humidity.png",
    Haze: "haze.png",
    Mist: "rain-day.png",
    Rain: "rain.png",
    Snow: "snow.png",
    Thunderstorm: "thunder_storm.png"
  };
  weatherIconElem.src = weatherIcons[data.weather[0].main] || "default.png";

  // Show the weather card
  weatherCard.style.display = "block";

  // Save the current city so it will be displayed on subsequent visits
  localStorage.setItem("lastCity", data.name);
}

/* Trigger search when clicking the button or pressing 'Enter' */
function triggerSearch() {
  const city = inputField.value.trim();
  if (city) {
    fetchWeather(city);
    inputField.value = "";
  }
}

searchBtn.addEventListener("click", triggerSearch);
inputField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") triggerSearch();
});

/* On page load, automatically search for the last saved city (if any) */
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    fetchWeather(lastCity);
  }
});
