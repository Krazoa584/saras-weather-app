//time
let actualTime = new Date();
let date = actualTime.getDate();
let year = actualTime.getFullYear();
let hours = actualTime.getHours();
let minutes = actualTime.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[actualTime.getDay()];

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
let month = months[actualTime.getMonth()];

let span = document.querySelector("#calendar");
span.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

if (hours < 10) {
  span.innerHTML = `${day}, ${date} ${month} ${year}, 0${hours}:${minutes}`;
}

if (minutes < 10) {
  span.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:0${minutes}`;
}

//search button
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCityButton);

function searchCityButton(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#search-for-city");
  search(submitCity.value);
}

//search form
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#search-for-city");
  search(submitCity.value);
}

function search(city) {
  let key = `99495e1ca3e445a51487c94ad1c48fde`;
  let mapUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let url = `${mapUrl}${city}&appid=${key}&units=metric`;
  axios.get(url).then(showDates);
}

//weather details
function showDates(weatherdetails) {
  let degrees = Math.round(weatherdetails.data.main.temp);
  let changeDegrees = document.querySelector("#actualdegrees-id");
  changeDegrees.innerHTML = `${degrees} °C`;
  let city = document.querySelector("#city-name");
  city.innerHTML = weatherdetails.data.name;
  let feelslike = (document.querySelector("#feelslike").innerHTML = Math.round(
    weatherdetails.data.main.feels_like
  ));
  let windspeed = (document.querySelector("#windspeed").innerHTML = Math.round(
    weatherdetails.data.wind.speed
  ));
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    weatherdetails.data.main.humidity
  ));
  let weatherdescription = (document.querySelector(
    "#weatherdescription"
  ).innerHTML = weatherdetails.data.weather[0].description);

  let weathericon = document.querySelector("#weathericon");
  weathericon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherdetails.data.weather[0].icon}@2x.png`
  );
  weathericon.setAttribute("alt", weatherdetails.data.weather[0].description);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = `99495e1ca3e445a51487c94ad1c48fde`;
  let mapUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let url = `${mapUrl}lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showDates);
}

function SearchCurrentLocation(location) {
  location.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#btncurrentlocation");
btncurrentlocation.addEventListener("click", SearchCurrentLocation);

search("Vienna");
//current Location
