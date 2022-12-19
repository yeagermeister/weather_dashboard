// Aside Elements
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityInput");
var cityListEl = document.querySelector("#city-list");

// Current weather Elements
var cityEl = $("#city");
var icon0El = $("#icon0");
var tempEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");

// Weather Variables
var openWeatherAPIKey = "ac202244dda6e740100cc79c2e5b8ee8";
var city
var lat;
var lon;

function init() {
	getSavedLocations();
};

var formSubmitHandler = function (event) {
	event.preventDefault();

	city = cityInputEl.value.trim();
	if (city) {
		getGeocode(city);
		cityInputEl.value = "";
		cityInputEl.attr("city", city);
	} else {
		alert("Please enter a city");
	}
};

var getGeocode = function() {
	var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + openWeatherAPIKey;

	fetch(apiUrl)
		.then(function (response) {
			if(response.status) {
				return response.json();
			}
		})
	
		.then(function (data) {
			// console.log(data);
			lon = data[0].lon;
			lat = data[0].lat;
			var savedLocation = [city, lat, lon];
			localStorage.setItem("wddata", JSON.stringify(savedLocation));
			getWeather();
			getForecast();
		});

};

var getWeather = function () {
	var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=" + openWeatherAPIKey +"&units=imperial";

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				// console.log(response);
				response.json().then(function (data) {
					// console.log(data);
					humidity = data.current.humidity;
					temp = data.current.temp;
					wind = data.current.wind_speed;
					icon = data.current.weather[0].icon;
					iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

					$('#city').text(city);
					$('#icon0').attr('src', iconurl);
					$('#wind').text('Wind: ' + wind + ' MPH');
					$('#temp').text('Temp: ' + temp + ' &degF');
					$('#humidity').text('Humidity: ' + humidity + "%");
					// console.log('scr="' + iconurl + '"');
// Still need to fix where the icon is displyed
// And get the data displayed next to the City Name
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to connect to OpenWeather");
		});

	
};

var getForecast = function () {
	var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAPIKey +"&units=imperial";

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);

					for (i = 1; i < 6; i++) {
					humidity = data.daily[i].humidity;
					temp = data.daily[i].temp[0];
					wind = data.daily[i].wind_speed;
					icon = data.daily[i].weather[0].icon
					iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
					time = data.daily[i].dt;
					// console.log(time);
					}

// Still need to fix where the icon is displyed
// And get the data displayed next to the City Name
// Can the icon be a badge?  bootstrap
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to connect to OpenWeather");
		});
};

var getSavedLocations = function () {
	var storedLocations = JSON.parse(localStorage.getItem("wddata"))
	console.log(storedLocations);
	if (storedLocations) {
		for (var i = 0; i < storedLocations.length; i++) {
			var location = storedLocations[i];
			var tempCity = location[0];
			lat = location[1];
			lon = location[2];



			var li = document.createElement("li");
			li.textContent = tempCity;
			li.setAttribute("lat", lat);
			li.setAttribute("lon", lon);

			cityListEl.appendChild(li);
		}
	}
};

var saveLocations = function () {

};

var displayRepos = function (repos, searchTerm) {
	if (repos.length === 0) {
		repoContainerEl.textContent = "No repositories found.";
		return;
	}

	repoSearchTerm.textContent = searchTerm;

	for (var i = 0; i < repos.length; i++) {
		var repoName = repos[i].owner.login + "/" + repos[i].name;

		var repoEl = document.createElement("a");
		repoEl.classList = "list-item flex-row justify-space-between align-center";
		repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

		var titleEl = document.createElement("span");
		titleEl.textContent = repoName;

		repoEl.appendChild(titleEl);

		var statusEl = document.createElement("span");
		statusEl.classList = "flex-row align-center";

		if (repos[i].open_issues_count > 0) {
			statusEl.innerHTML =
				"<i class='fas fa-times status-icon icon-danger'></i>" +
				repos[i].open_issues_count +
				" issue(s)";
		} else {
			statusEl.innerHTML =
				"<i class='fas fa-check-square status-icon icon-success'></i>";
		}

		repoEl.appendChild(statusEl);

		repoContainerEl.appendChild(repoEl);
	}
};

init();

userFormEl.addEventListener("submit", formSubmitHandler);
// languageButtonsEl.addEventListener("click", buttonClickHandler);
