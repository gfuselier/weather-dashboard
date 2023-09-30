var searchBtn = document.getElementById("search-btn")
var searchBox = document.getElementById("search-box")

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(event)
    var city = searchBox.value
    console.log(city);

    var history = JSON.parse(localStorage.getItem("cities")) || []
    history.push(city)
    localStorage.setItem("cities",JSON.stringify(history))

    //make the url! with city and api key
    //fetch!
    //target and update html with data
}
)

