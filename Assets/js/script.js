var formEl = document.querySelector('#searchForm');
var inputEl = document.querySelector('#cityInput');
var cityAreaEl = document.querySelector('#cityArea');
var forecastEl = document.querySelector('#forecast');

var openWeatherAPIKey = "ac202244dda6e740100cc79c2e5b8ee8";

function init() {
    var citylist = JSON.parse(localStorage.getItem("wddata"));
    if (citylist !== null ) {
		writeCities(citylist);
		console.log(citylist.length);
		i = citylist.length - 1
		citydata = citylist[i];
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
					console.log(data);
					humidity = data.current.humidity;
					temp = data.current.temp;
					wind = data.current.wind_speed;
					icon = data.current.weather[0].icon;
					iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
					iconEl = '<img src="' + iconUrl + '" alt="weather condition icon">'
					$('#city').text(city);
					$('#icon0').append(iconEl);
					$('#wind').text(wind);
					$('#temp').text(temp);
					$('#humidity').text(humidity);

					for (i = 1; i < 6; i++) {
						humidityd = data.daily[i].humidity;
						tempd = data.daily[i].temp.max;
						windd = data.daily[i].wind_speed;
						icond = data.daily[i].weather[0].icon;
						iconUrld = "http://openweathermap.org/img/w/" + icond + ".png";

						var cardEl = document.createElement('div');
						cardEl.classList = "card mycard";
						cardEl.setAttribute("id", "day-" + i);
						
						// var dateEl = 
						var iconEld = document.createElement('img');
						iconEld.setAttribute("src", iconUrld)
						iconEld.setAttribute("alt", "weather condition icon")

						var tempEld = document.createElement('p');
						tempEld.setAttribute("id", "temp-" + i);
						tempEld.textContent = "Temp: " + tempd + " \u00B0F";

						var windEld = document.createElement("p");
						windEld.setAttribute("id", "wind-" + i);
						windEld.textContent = "Wind: " + windd + " MPH";

						var humidityEld = document.createElement("p");
						humidityEld.setAttribute("id", "humidity-" + i);
						humidityEld.textContent = "Humidity: " + humidityd + " %;";

						forecastEl.appendChild(cardEl);
						cardEl.appendChild(iconEld);
						cardEl.appendChild(tempEld);
						cardEl.appendChild(windEld);
						cardEl.appendChild(humidityEld);
					}
				});
			} else {
				alert("Error: " + response.statusText);
			}
		})
		.catch(function (error) {
			alert("Unable to connect to OpenWeather");
		});

};

// event listener for the search
formEl.addEventListener("submit", formSubmitHandler);

// event listener for clicking on a city
// cityAreaEl.addEventListener('click', '.cityButton', getWeather);

init();