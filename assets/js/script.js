var searchBtn = document.getElementById("search-btn");
var searchBox = document.getElementById("search-box");
var cityHistory = document.getElementById("city-history");
var featureBox = document.getElementById("feature-box");
var cityName = document.getElementById("city-name");
var weatherIcon = document.getElementById("weather-icon");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var fiveDayForecast = document.getElementById("five-day");
var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];

//makes city history list items on page load
function pageLoad() {
    if (searchHistory.length) {
        for (i=0; i < searchHistory.length; i++) {
            var searchedCity = document.createElement("li");
            searchedCity.textContent = searchHistory[i];
            searchedCity.onclick = listItemSearch
            cityHistory.appendChild(searchedCity);
        }
    }
}

pageLoad();

//adds event listener to search button
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = searchBox.value.trim();

  //stores the search history
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem("cities", JSON.stringify(searchHistory));

    //adds the searched cities to the history section of the webpage
    var searchedCity = document.createElement("li");
    searchedCity.textContent = city;
    searchedCity.onclick = listItemSearch
    cityHistory.appendChild(searchedCity);
  }

  getWeather(city);
});

function listItemSearch() {
    console.log(this) //this is the list item that the user clicked on
    var clickedCity = this.textContent
    getWeather(clickedCity)
}

function getWeather(city) {
  //makes url for the first fetch
  var APIKey = "ddd62cc0a10cf570b502b56b15243447";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  //first fetch gets current weather data
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //puts data in the feature box
      cityName.textContent = city + " (" + dayjs().format("MM/DD/YY") + ")";
      var iconCode = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      weatherIcon.setAttribute("src", iconUrl);

      temp.textContent = "Temp: " + data.main.temp + "°F";
      wind.textContent = "Wind: " + data.wind.speed + " MPH";
      humidity.textContent = "Humidity: " + data.main.humidity + "%";

      //second fetch gets five-day forecast
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var fiveDayUrl =
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey +
        "&units=imperial";

      fetch(fiveDayUrl)
        .then(function (result) {
          return result.json();
        })
        .then(function (data) {
          console.log(data);
          fiveDayForecast.innerHTML = ""
          for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
              //dynamically creates a card for each day of the forecast
              var date1 = data.list[i].dt_txt.split(" ")[0];
              var day1 = dayjs(date1).format("MM/DD/YY");

              var card = document.createElement("div");
              card.setAttribute("class", "card");
              var h4 = document.createElement("h4");
              h4.textContent = day1;

              var icon = document.createElement("img");
              var iconCode = data.list[i].weather[0].icon;
              var iconUrl =
                "http://openweathermap.org/img/w/" + iconCode + ".png";
              icon.setAttribute("src", iconUrl);
              icon.style.height = "50px";
              icon.style.width = "50px";

              var temp = document.createElement("p");
              temp.textContent = "Temp: " + data.list[i].main.temp + "°F";
              var wind = document.createElement("p");
              wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
              var humidity = document.createElement("p");
              humidity.textContent =
                "Humidity: " + data.list[i].main.humidity + "%";

              card.appendChild(h4);
              card.appendChild(icon);
              card.appendChild(temp);
              card.appendChild(wind);
              card.appendChild(humidity);
              fiveDayForecast.appendChild(card);
            }
          }
        });
    });
}


