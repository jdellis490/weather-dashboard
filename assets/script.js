var searchForm = document.querySelector("#city-search");
var searchButton = document.querySelector("#searchbtn");
var APIKey = 'dd81a6b7086f366060794f2af941e0e8';
var currentCity;
var previousCity;

function searchSubmit(event) {
    event.preventDefault();
    var inputCity = searchForm.value;
    console.log(inputCity);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(error){
            console.log(error);
        })

    }
       
     











searchButton.addEventListener("click", searchSubmit)