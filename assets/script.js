var searchForm = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchbtn");
var APIKey = 'dd81a6b7086f366060794f2af941e0e8';
var currentCity;
var previousCity;

function searchSubmit(event) {
    event.preventDefault();
    var inputCity = searchForm.value;
    console.log(inputCity);
    if (!inputCity) {
        alert("Please enter a city!");
        return;
    }
    onSearch(inputCity);

}

function onSearch(searchValue) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            displayCurrentCity(data);
        })
        .catch(function(error){
            console.log(error);
        })
}

function displayCurrentCity(response){
    document.getElementById('city-display').innerHTML =`
    <div>
    <h3>${response.name}</h3>
    <ul class= "list-unstyled">
        <li>Temp: ${response.main.temp}</li>
        <li>Humidity: ${response.main.humidity}%</li>
        <li>Wind Speed: ${response.wind.speed} mph</li>
    </ul>
    </div>`;
}
        
    
    
     











searchButton.addEventListener("click", searchSubmit)