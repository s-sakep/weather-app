// Update date and time

function formatDateTime(now) {
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  return `${day} ${date} ${month} ${year} | ${hours}:${minutes}`;
}

let todayDateTime = document.querySelector("#today-date-time");
let now = new Date();
todayDateTime.innerHTML = formatDateTime(now);

// Convert to farenheit or celcius

function changeToCelsius(event) {
  event.preventDefault();
  let link = document.querySelector("#today-temp");
  link.innerHTML = "30°";
}

let unitCelsius = document.querySelector("#celsius-link");
unitCelsius.addEventListener("click", changeToCelsius);

function changeToFarenheit(event) {
  event.preventDefault();
  let link = document.querySelector("#today-temp");
  link.innerHTML = "86°";
}

let unitFarenheit = document.querySelector("#farenheit-link");
unitFarenheit.addEventListener("click", changeToFarenheit);

// Replace temperature with live data based on search input

function displayCurrentWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

searchCity("Oxford");

// Get weather of current location

function searchLocation(position) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
