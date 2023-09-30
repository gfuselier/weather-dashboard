var searchBtn = document.getElementById("search-btn")
var searchBox = document.getElementById("search-box")

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(event)
    var city = searchBox.value.trim()
    console.log(city);

    var history = JSON.parse(localStorage.getItem("cities")) || []
    history.push(city)
    localStorage.setItem("cities",JSON.stringify(history))

    var APIKey = "ddd62cc0a10cf570b502b56b15243447"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
    //fetch!
    //target and update html with data
}
)

