// my animals will go in a array

	//---Game Variables---//
var animals= ["gopher", "kangaroo", "eagle", "elephant", "sheep", "penguin"];
// side note: make sure giphy can pick up on all the animals in the array

console.log(animals);


//-------Button Creation--------//
// create buttons for all the animals within the array
function buttonCreate() { 

	// make sure the buttonArea is empty before redrawing
	$("#buttonArea").empty(); 		//side note: Ask if this is correct and why it is correct


	// now create a loop to get through the array of animals I created
	for(var i = 0; i<animals.length; i++) {

		// creating buttons dynamically in the array
		var button= $("<button>");

		//adding a class to the selected element
		button.addClass("animalButton"); 

		// adding the attribute "data-animal" to the animal selected within the array
		button.attr("data-animal", animals[i]);

		//putting text on the dynamically created button
		button.text(animals[i]);


		// now adding the button to the html
		$("#buttonArea").append(button);

	}
}


//----Event  Handlers----//

// an event HANDLER for when the user adds animals to the array
$("add-animal").click(function(event){


	// why do I have to use this?
	event.preventDefault(); // Description = this method is called, the default action of the event will not be triggered

	// grab the value from the user input and trim the whitespace
	var userAnimal= $("#animalInput").val().trim();
	console.log(userAnimal);

	// now add the userinput animal into the array that you created
	animals.push(userAnimal);
	 $("#animalInput").val("");

	 // create the button
	 buttonCreate();


});




//---Fetch the GIFS from the API--//

function fetch() {

	// Get the animal name from the button clicked
	var animalName= $(this).attr("data-animal");
	// Make the string out of the animal name
	var animalString= animalName.split("").join("+");

	// GIPHY URL into a variable (hold the url)
	var queryUrl= "https://api.giphy.com/v1/gifs/search?q=" + animalString + "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";


	//AJAX call for the GIPHY API
	$.ajax({
		method: "GET",
		url: queryUrl,
	})

	.done(function(result) {
	// Grab the results and the properites of the results
	var dataArray= result.data;


	// Display the GIF's
	$("#gifArea").empty();

	// for loop to iterate through the array of GIF's 
		for (var i=0; i < dataArray.length; i++) {

			var newDiv= $("<div>");
			newDiv.addClass("animalGif");

			// displays the rating in the html for each animal in the array
			var newRating= $("<h2>").html("Rating: " + dataArray[i].rating);

			// appends the new rating within the created div to the page
			newDiv.append(newRating);


			// create a new img
			var newImg = $("<img>");

			
			// add attributes to the new image (fixed height)//
			// grab the value for the attribute location of the image
			newImg.attr("src", dataArray[i].images.fixed_height_still.url);
			// grab the value for the attribute "data still"		
			newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
			// grab the value for the attribute "data animate"	
			newImg.attr("data-animate", dataArray[i].images.fixed_height_still.url);
			// grab the value for the attribute "data-state"	
			newImg.attr("data-state", "still");

			//append the image to the div
			newDiv.append(newImg);


			// append the Gifs to the gifArea
			$("#gifArea").append(newDiv);
		}

	});

}

function animateGif () {

	// use the data state to make the image move or stand still
	var state= $(this).attr("data-state");

	console.log(state); //state is undefined....figure out why it is undefined

	// create a if-else statement 
	// if the gif is not moving change the state to animate 
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state","animate");


	}
	 else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}


// Create my buttons I created when the page loads
$(document).ready(function() {
	buttonCreate();
});


// The user create the buttons after the page has loaded and find the gifs
$(document).on("click",".animalButton", fetch);


// Event handler to animate the gifs (start/stop)
$(document).on("click", ".animalGif", animateGif);
