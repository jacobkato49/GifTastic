// my animals will go in a array

	//---Game Variables---//
var animals= ["gopher", "kangaroo", "eagle", "elephant", "sheep", "penguin", "bluefin tuna", "lynx", "cheetah", "jaguar", "t-rex", "pig", "platypus", "gorilla", "lion", "komodo dragon", "phoenix"];
// side note: make sure giphy can pick up on all the animals in the array

console.log(animals);


//-------Button Creation--------//
// create buttons for all the animals within the array
function buttonCreate() { 

	// make sure the buttonArea is empty before redrawing
	$("#buttonArea").empty(); 		//side note: Ask if this is correct and why it is correct


	// now create a loop to get through the array of animals I created
	for(var i = 0; i<animals.length; i++) {
		console.log(animals.length);
		console.log(animals[2]);

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






// GIPHY URL
 // Create a variable to hold the url

//AJAX call for the GIPHY API