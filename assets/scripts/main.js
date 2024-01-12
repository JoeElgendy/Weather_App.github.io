// Fetching Weather Data
// Displaying the data
// Handling user input
// Updating the UI
// Error Handling

// API related Data
const apiKey = "key=9501d442fd4c46c3b96151833241101";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?";
const searchLoc = "&q=";
const forecast = "&days=3&aqi=no&alerts=no";

async function fetchWeather(reqLocation) {
  const url = `${baseUrl}${apiKey}${searchLoc}${reqLocation}${forecast}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      displayWeatherData(data);
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to fetch weather data: ", error);
  }
}

function displayWeatherData(data) {
  if (data) {
    displayCurrentWeather(data);
    displayForecastWeather(data);
  }
}
function displayCurrentWeather(data) {
  if (data != null) {
    // Get the current date from the API data
    const currentDate = new Date(data.current.last_updated);

    // Use the dayName function to get the day name
    const dayOfWeek = getDayName(currentDate.getDay());

    // Format the date as "08 January"
    const dateFormatted = `${currentDate.getDate()} ${getMonthName(
      currentDate.getMonth()
    )}`;

    let n = ` 
    <div class="col-lg-4 m-0 px-0" id="current-forecast">
    <div
      class="forecast-header d-flex justify-content-between pt-2 px-2 text-white fs-6-5 mb-0"
    >
      <p>${dayOfWeek}</p>
      <p>${dateFormatted}</p>
    </div>            
    <div class="forecast-content py-4 text-white">
    <div class="forecast-location p-3">
      <h3>${data.location.region}</h3>
      <p>${data.location.name}</p>
    </div>
    <div
      class="degree-img d-flex justify-content-between align-content-center p-3"
    >
      <h1 style="font-size: 90px">
        ${data.current.temp_c}<sup>o</sup>C
      </h1>
      <img
        src="${data.current.condition.icon}"
        alt=""
        width="113"
        class="me-4"
      />
    </div>
    <div class="forecast-cloud p-3 text-info">
      <p>${data.current.condition.text}</p>
    </div>
    <div
      class="forecast-additional-details d-flex justify-content-start align-items-center p-3"
    >
      <span class="me-3 fs-6-5">
        <img
          src="./assets//Imgs/icon-umberella.png"
          alt=""
          class="pe-1"
        />
        ${data.current.humidity}%
      </span>
      <span class="me-3 fs-6-5">
        <img
          src="./assets//Imgs/icon-wind.png"
          alt=""
          class="pe-1"
        />
        ${data.current.wind_kph}Km/h
      </span>
      <span class="me-3 fs-6-5">
        <img
          src="./assets//Imgs/icon-compass.png"
          alt=""
          class="pe-1"
        />
        ${data.current.wind_dir}
      </span>
    </div>
  </div>
  </div>
  `;
    document.querySelector(".forecast-inner").innerHTML = n;
  }
}
function displayForecastWeather(data) {
  if (data != null) {
    let n = ``;
    for (let i = 1; i < data.forecast.forecastday.length; i++) {
      // Convert the date string to a Date object
      const dateStr = data.forecast.forecastday[i].date;
      const dateObj = new Date(dateStr);

      // Use the dayName function to get the day name
      const dayOfWeek = getDayName(dateObj.getDay());
      n += `<div class="col-lg-4 m-0 px-0" id="next-forecast">            
       <div class="forecast-header text-center d-flex align-content-center justify-content-center pt-2 px-2 text-white fs-6-5 mb-0">
          <p>${dayOfWeek}</p>
          <p></p>
       </div>
      <div class="forecast-content py-4 text-white text-center">
      <div class="forecast-location p-3">
      <h3>${data.location.region}</h3>
      <p>${data.location.name}</p>
    </div>
      <div class="degree-img p-3">
        <img
          src="${data.forecast.forecastday[i].day.condition.icon}"
          alt=""
          width="96"
          class="me-4"
        />
        <h3>${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h3>
        <h5 class="fs-6 pb-3">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</h5>
      </div>
      <div class="forecast-cloud px-3 pt-3 pb-5">
        <p class="text-info pb-4 mb-3">${data.forecast.forecastday[i].day.condition.text}</p>
      </div>
    </div>
    </div>
    `;
    }
    document.querySelector(".forecast-inner").innerHTML += n;
  }
}

document.getElementById("Search-btn").addEventListener("click", () => {
  const location = document.getElementById("search-text").value;
  fetchWeather(location);
});
document.getElementById("search-text").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const location = document.getElementById("search-text").value;
    fetchWeather(location);
  }
});

function getDayName(dayNumber) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[dayNumber]; // Current weekDay
  return dayName;
}

function getMonthName(monthNumber) {
  const months = [
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
  return months[monthNumber];
}

document.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordinates = `${latitude},${longitude}`;
  fetchWeather(coordinates);
}

function error() {
  console.log("Unable to retrieve your location");
}

const nav_links = document.querySelectorAll(".extra");

// Function to add the 'btn-outline-info' class
function addOutlineClass() {
  this.classList.add("btn-outline-info");
}

// Function to remove the 'btn-outline-info' class
function removeOutlineClass() {
  this.classList.remove("btn-outline-info");
}

// Add event listeners to each button
nav_links.forEach((nav_link) => {
  nav_link.addEventListener("mouseenter", addOutlineClass);
  nav_link.addEventListener("mouseleave", removeOutlineClass);
});
