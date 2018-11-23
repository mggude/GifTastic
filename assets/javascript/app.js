var topics = ["animals", "cats", "dogs", "Tarantino", "Harry Potter", "space", "Obama", "Spongebob", "Colorado", "Disney", "pizza", "tacos", "yoga", "Halloween", "Christmas", "coding", "chocolate", "Buddha", "Switzerland", "snowboarding"];

var checkGifState = function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

var generateGifImages = function (results) {
    console.log(results);
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var gifDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var rating = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var gifImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        var stillImage = results[i].images.fixed_width_still.url;
        var animatedImage = results[i].images.fixed_width.url;

        // Setting still and animated data-states
        gifImage.attr("src", stillImage);
        gifImage.attr("data-animate", animatedImage);
        gifImage.attr("data-still", stillImage);
        gifImage.attr("data-state", "still");

        // adding class to access gifImages
        gifImage.addClass("gif");

        // Appending the paragraph and image tag to the gifDiv
        gifDiv.append(gifImage, rating);

        // adding class for bootstrap styling
        gifDiv.addClass("col-md-3");

        // Prependng the gifDiv to the HTML page in the "#gif-view" div
        $("#gif-view").prepend(gifDiv);
    }
    $(".gif").on("click", checkGifState);

}

var getDataFromGiphyApi = function (url) {
    $.ajax({
        url: url,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            generateGifImages(results);
        });
}



function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=E8ZcDZTDI8eIt0yCGLvQgf9MvRHVopQL&limit=10";
    getDataFromGiphyApi(queryURL);
}

function renderButtons() {

    // Deleting the topics prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag.
        var a = $("<button>");
        // Adding a class of gif-btn, btn, and btn-info (click event listener, bootstrap) to our button
        a.addClass("gif-btn btn btn-info");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }

}

var addGifTopicBtn = function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#gif-input").val().trim();

    // Adding topic from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", addGifTopicBtn)

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();


