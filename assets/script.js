var searchCityForm = document.querySelector("#city-form");
var searchCityEl = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchbtn");
var citySearchEl= document.querySelector("#searched-city")
var weatherContainer = document.querySelector("#weather-container");
var cityForecast = document.querySelector("#forecast");
var APIKey = 'dd81a6b7086f366060794f2af941e0e8';
var currentDay = moment().format('l');
var fiveDayContainer = document.querySelector("container-five-forecast")


function searchSubmit(event) {
    event.preventDefault();
    var city = searchCityEl.value;
    console.log(city);
    if (!city) {

        alert("Please enter a city!");
        return;
    }
    getWeather(city);
}

function getWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(queryURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            displayCurrentWeather(data, city);
        })
        .catch(function(error){
            console.log(error);
        })
};

function displayCurrentWeather(weather, searchedCity){
    weatherContainer.textContent= "";
    citySearchEl.textContent= searchedCity;
 
    console.log(weather);

    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment(weather.dt.value).format("l") + ") ";
    citySearchEl.appendChild(currentDate);
 
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchEl.appendChild(weatherIcon);
 
    var tempEl = document.createElement("span");
    tempEl.textContent = "Temperature: " + weather.main.temp + "°F";
    tempEl.classList = "list-group-item"

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item"
 
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " mph";
    windSpeedEl.classList = "list-group-item"
 
    weatherContainer.appendChild(tempEl);
    weatherContainer.appendChild(humidityEl);
    weatherContainer.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvStatus(lat,lon)
}

function getUvStatus(lat,lon){
    var apiKey = "dd81a6b7086f366060794f2af941e0e8"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            showUvIndex(data)
        })
    })
}

function showUvIndex(index){
    var uvIndex = document.createElement("div");
    uvIndex.textContent = "UV Index: "
    uvIndex.classList = "list-group-item"
    indexValue = document.createElement("span")
    indexValue.textContent = index.value

    if(index.value <= 2){
        indexValue.classList = "favorable"
    }else if(index.value >2 && index.value <= 8){
        indexValue.classList = "moderate"
    }else if(index.value > 8){
        indexValue.classList = "severe"
    };
    uvIndex.appendChild(indexValue);
    weatherContainer.appendChild(uvIndex);
}




    //Icon URL  "http://openweathermap.org/img/wn/" + iconUrl + "@2x.png";
    https://openweathermap.org/weather-conditions#How-to-get-icon-URL
    
     











searchButton.addEventListener("click", searchSubmit)