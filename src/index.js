function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
        ` <div class="col">
            <div class="bottom">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
            <div class="top">
              <span>${Math.round(forecastDay.temp.max)}°</span>
              <span>${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "343e26b3ffb2c17a61d6a1123defd48c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°";
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min) + "°";
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max)+"°";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity +"%";
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed) +"mph";
  let iconElement = document.querySelector("img");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  let sunrise = document.querySelector("#sunrise");
  let riseElement = response.data.sys.sunrise;
  sunrise.innerHTML = new Date(riseElement * 1e3).toLocaleTimeString();
  let sunset = document.querySelector("#sunset");
  let setElement = response.data.sys.sunset;
  sunset.innerHTML = new Date(setElement * 1e3).toLocaleTimeString();

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "80b5b4bfb3171079c6d323d0bf6f3213";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "80b5b4bfb3171079c6d323d0bf6f3213";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formatDate(date) {
  return(date.toLocaleTimeString('en-US'));
}


let form = document.querySelector("form");
form.addEventListener("submit", submitSearch);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

search("Austin");




