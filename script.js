var keyAPI = "cdd4055a38f46164c0c3dfa5059c4bb9";
var cities = [];

init();

function init() {
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedcities = JSON.parse(localStorage.getItem("todos"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedcities !== null) {
        cities = storedcities;
    }
    // Calling the renderButtons function to display the initial buttons
    renderButtons();

    //     loadJSON(function (response) {
    //         // Parse JSON string into object
    //         var actual_JSON = JSON.parse(response);
    //     });

}
// Function for displaying city data
function renderButtons() {
    console.log(cities);
    // Deleting the movie buttons prior to adding new city buttons
    // (this is necessary otherwise we will have repeat buttons)
    // $("#citiesField").empty();

    if (cities.length != null || cities.length > 0); {
        // Looping through the array of movies
        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each city in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("city");
            // Adding a data-attribute with a value of the city at index i
            a.attr("data-name", cities[i]);
            // Providing the button's text with a value of the city at index i
            a.text(cities[i]);
            // Adding the button to the HTML
            $("#city").append(a);
        }
    }
}

function storecities() {
    localStorage.setItem("citiesArray", JSON.stringify(cities));
}

//Search functionality
function displayCityInfo() {

    var city = $(this).attr("data-name");
    // make URL    
    // var queryURL = "api.openweathermap.org/data/2.5/weather?id=" + city + "&apikey=trilogy";

    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + keyAPI;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Creating a div to hold the city
        var cityDiv = $("<div class='city'>");

        // Storing the temp data
        var temp = response.main.temp;

        // Creating an element to have the temp displayed
        var tempLine = $("#tempLine").text("Temperature: " + temp + " F");

        // Displaying the temp
        $("#tempLine").append(tempLine);

        // Storing the humidity
        var humid = response.main.humidity;

        // Creating an element to hold the humidity
        var humidLine = $("#humidLine").text("Humidity: " + humid + "%");

        // Displaying the humidity
        $("#humidLine").append(humidLine);

        // Storing the wind speed
        var wind = response.wind;

        // Creating an element to hold the wind speed
        var windLine = $("#windLine").text("Wind Speed: " + wind + " MPH");

        // Appending the wind speed
        $("#windLine").append(windLine);

        //   // Retrieving the URL for the image
        //   var weather = response.description;

        //   // Creating an element to hold the image
        //   var image = $("<img>").attr("src", imgURL);
        //  // adds alts
        //  image.attr("alt", weather)
        //   // Appending the image
        //   $("h2").append(image);

        // Putting the entire new city above the previous cities
        $("#city").prepend(cityDiv);
    });

}

// add city 
// This function handles events where a city button is clicked
$("#search").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cityNew = $("#cityInput").val().trim();

    console.log(cityNew);

    // Adding movie from the textbox to our array
    cities.push(cityNew);

    console.log(cities);
    storecities();
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".city", displayCityInfo);
