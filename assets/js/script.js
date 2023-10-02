var searchBtn = document.getElementById("search-btn")
var searchBox = document.getElementById("search-box")
var cityName = document.getElementById("city-name")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var city = searchBox.value.trim()
    console.log(city);

    var history = JSON.parse(localStorage.getItem("cities")) || []
    history.push(city)
    localStorage.setItem("cities",JSON.stringify(history))

    var APIKey = "ddd62cc0a10cf570b502b56b15243447"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            console.log(data.main.temp)
            console.log(data.wind.speed)
            temp.textContent = "Temp: " + data.main.temp + "°F"
            wind.textContent = "Wind: " + data.wind.speed + " MPH"
            humidity.textContent = "Humidity: " + data.main.humidity + "%"
        })
    
    //target and update html with data
}
)

