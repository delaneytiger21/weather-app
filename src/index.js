// Converting Hours / Minutes to timestamp
function formatDate(date) {
  return(date.toLocaleTimeString('en-US'));
  }

// Plugging in API values to designated fields 
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) + "°";
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min) + "°";
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max)+"°";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity +"%";
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed) +"mph";
  document.querySelector("#icon").innerHTML = response.data.weather[0].icon;
  console.log(response.data);
}
// Calling the city 
function search(city) {
  let apiKey = "80b5b4bfb3171079c6d323d0bf6f3213";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);
search("Austin");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
