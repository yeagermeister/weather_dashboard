var formEl = document.querySelector("#searchForm");
var inputEl = document.querySelector("#cityInput");

var openWeatherAPIKey = "ac202244dda6e740100cc79c2e5b8ee8";

function init() {
    var citylist = JSON.parse(localStorage.getItem("wddata"));
    if (citylist !== null ) {
		writeCities(citylist);
		console.log(citylist.length);
		citydata = citylist[2];
		console.log(citydata);
		city = citydata[0];
		lat = citydata[1];
		lon = citydata[2];
		getWeather(city, lat, lon);
	}
};

function writeCities(citylist) {
    for (i = 0; i < citylist.length; i++) {
        var element = "#city-" + i;
        var buttonEl = document.querySelector(element);
        buttonEl.classList = "myButton cityButton mb-3";
		city = citylist[i]
        buttonEl.innerHTML = city[0];
    }
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = inputEl.value.trim();
    if (city) {
        getGeocode(city);
    } else {
		alert("Please enter a city");
	}

    inputEl.value = "";

};

function getGeocode(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + openWeatherAPIKey;

	fetch(apiUrl)
		.then(function (response) {
			if(response.status) {
				return response.json();
			}
		})
	
		.then(function (data) {
			lat = data[0].lat;
			lon = data[0].lon;
			city = data[0].name;
			locdatatemp = [city, lat, lon];
			locdata = JSON.parse(localStorage.getItem("wddata"));
			if (locdata === null) {
				locdata =[]
			}
			locdata.push(locdatatemp);
			localStorage.setItem("wddata", JSON.stringify(locdata));
			location.reload();
		})


};

var getWeather = function (city, lat, lon) {
	var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=" + openWeatherAPIKey +"&units=imperial";

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data) {
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


formEl.addEventListener("submit", formSubmitHandler);

init();