// $(document).ready (function (){
    var userFormEl = document.querySelector("#user-form");
    var inputEl = $("#cityInput");
// var btnSubmit = $("#btnSubmit")

// var locations = [];

    // Open Weather API variables
// var openWeatherAPIKey = "ac202244dda6e740100cc79c2e5b8ee8";

userFormEl.addEventListener('submit', formSubmitHandler)

// function(e) {
//     e.preventDafault();
//     // getGeocode();
//     console.log("clicked");
// });


var formSubmitHandler = function (event) {
	event.preventDefault();

	var username = inputEl.value.trim();
    console.log(username);
	if (username) {
        console.log(username);
		inputEl.value = "";
	} else {
		alert("Please enter a GitHub username");
	}
};


// function init() {
//     // getLocalStorage()
//     // getGeocode()
// };

// Populate the saved cities from local storage
// function getLocalStorage() {
//     var storedLocations = JSON.parse(localStorage.getItem("wddata"));
//     console.log("storedocations", storedLocations);
//     locations = storedLocations;
//     generateLocations();
// };


// Fill in the webpage 
// function generateLocations() {
// console.log("locations", locations)
// };

// var getGeocode = function() {
//     // event.preventDafault();
//     console.log(inputEl.value.trim())
// var city = inputEl.value
// var connectStringGeocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + openWeatherAPIKey;
// var lat;
// var lon;

// fetch(connectStringGeocode)
//     .then(function (response) {
//         if(response.status) {
//             return response.json();
//         }
//     })
//     .then(function (data) {
//         lon = data[0].lon;
//         lat = data[0].lat;
//         var weatherLocation = [lat, lon];
//         var savedLocation = [city, weatherLocation];
//         localStorage.setItem("wddata", JSON.stringify(savedLocation));
//     });
    // event.preventDafault();
// };



// listener for a click on a saved city


// Add the searched city to local storge to include lat and long so they dont need to be searched again


// Populate the saved cities from local storage
// function getLocalStorage() {
//     var storedLocations = JSON.parse(localStorage.getItem("wddata"));
//     console.log("storedocations", storedLocations);
//     locations = storedLocations;
//     generateLocations();
// };


// Fill in the webpage 
// function generateLocations() {
// console.log("locations", locations)
// };

// function to get the current weather and 5 day forecast from the weather API

// function getWeather() {
//     console.log("getWeather",lat, lon);
//     var connectStringOpenWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAPIKey;
// fetch(connectStringOpenWeather)
//     .then(function (response) {
//         // if(response.status) {
//             return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })

// };


// listener for the city search
    // Call the Geocode API to get Lat and Long


//  Need a listener for the city button clicks


// init();

// the init need to check local storage for previous cities city
// });