var searchBtn = document.getElementById("search-btn")
var searchBox = document.getElementById("search-box")
var cityHistory = document.getElementById("city-history")
var featureBox = document.getElementById("feature-box")
var cityName = document.getElementById("city-name")
var weatherIcon = document.getElementById("weather-icon")
var temp = document.getElementById("temp")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
var fiveDayForecast = document.getElementById("five-day")

//adds event listener to search button
searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var city = searchBox.value.trim()

    //stores the search history
    var searchHistory = JSON.parse(localStorage.getItem("cities")) || []
    searchHistory.push(city)
    localStorage.setItem("cities",JSON.stringify(searchHistory))

    //adds the searched cities to the history section of the webpage
    var searchedCity = document.createElement("li")
    searchedCity.textContent = city
    cityHistory.appendChild(searchedCity)

    //makes url for the first fetch
    var APIKey = "ddd62cc0a10cf570b502b56b15243447";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    //first fetch gets current weather data
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)

            var iconCode = data.weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
            cityName.textContent = city + " (" + dayjs().format("MM/DD/YY") + ")"
            weatherIcon.setAttribute("src", iconUrl)

            temp.textContent = "Temp: " + data.main.temp + "°F"
            wind.textContent = "Wind: " + data.wind.speed + " MPH"
            humidity.textContent = "Humidity: " + data.main.humidity + "%"
        });

    var fiveDayUrl =  "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
})

//click on history and get the data again

