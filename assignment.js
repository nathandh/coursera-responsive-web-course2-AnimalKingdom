/**
	Main JS File to load and compile our data with
	Handlebar template, and output to HTML containers
	
	Feb 2016:Initial		@nathandh 
**/
// Bootstrap Tabs
var tabs_template;

//Handlebars helper to increment index, for our labelling purposes
Handlebars.registerHelper("increment", function(value, options){
	return parseInt(value) + 1;	// To increment index value by 1
});

/*Handlebars helper to pluralize Animal specie name entries in our Main Gallery, 
  for our labelling purposes. So that we don't wrongly output something like 'Mouses' 
  instead of 'Mice'.  
*/
Handlebars.registerHelper("plural", function(value, options){
	// We can add other animal checks as needed below.
	// Check for Mouse
	if (String(value) == "Mouse"){
		console.log("We are at Mouse; Need to return Mice to pluralize!");
		return "Mice";
	}
	
	// Other just return our value with an 's' appended
	return String(value + 's');
});

Handlebars.registerHelper("trimspace", function(value, options){
	return value.replace(/ +/g, "");
});

// Customer function declaration specific to AnimalKingdom dynamic web site
var AnimalKingdom = {
	galleryModalize: function(){
		// Used to hold our modal html mappings for animals
		var modalHTML = [];
		/** Will store objects of type:
			{
				"id": "",
				"title": "",
				"body": ""
			}
		**/
		
		// Add click listener links to popup a modal in our Main Gallery View
		for (var idx in animals_data["category"]){
			var species = animals_data["category"][idx];
			//console.log(JSON.stringify(species));
			var name = species.name;
			console.log(name);
			
			for (var animal in species.animals){
				//console.log(species.animals[animal]);
				var animal = species.animals[animal];
				//console.log(animal);
				
				// Trim our name from whitespace inbetween words
				var trimmed_animal_name = animal.name.replace(/ +/g, "");
				
				// Generate and store our Modal HTML values
				/* Later iterations can make this cleaner, 
				 * i.e. do better mapping, don't do multiple pushes
				 * but for now this is functional ;-) !
				 */
				modalHTML.push({"id":trimmed_animal_name+'_'+'photo1', "title":animal.name, 
								"body":'<img src="'+animal.image1+'"'+'alt="Image1 Modal">'});
				modalHTML.push({"id":trimmed_animal_name+'_'+'photo2', "title":animal.name, 
								"body":'<img src="'+animal.image2+'"'+'alt="Image2 Modal">'});
				
				// Activate click listener on image to programatically popup a modal with larger image
				// only in Main Gallery where we initially display smaller images
				$('#'+trimmed_animal_name+'_'+'photo1').find("img", this).click(function(event){
					var my_modalHTML = "";
					// Lookup and Set our Modal Data
					var my_parent = ($(event.target).parent().parent());
					//console.log(my_parent);
					for (var idx = 0; idx < modalHTML.length; idx++){
						//console.log(modalHTML[idx]);
						if (modalHTML[idx].id == my_parent[0].id){
							console.log("We have a match! Setting HTML...");
							my_modalHTML = modalHTML[idx];
							break;
						}
					}
					
					$('#imgModalTitle').empty();
					$('#imgModalBody').empty();
					$('#imgModalTitle').html(my_modalHTML.title);
					$('#imgModalBody').html(my_modalHTML.body);
					
					$('#imgModal').modal('show');
				});	
				$('#'+trimmed_animal_name+'_'+'photo2').find("img", this).click(function(event){
					var my_modalHTML = "";
					// Lookup and Set our Modal Data
					var my_parent = ($(event.target).parent().parent());
					//console.log(my_parent);
					for (var idx = 0; idx < modalHTML.length; idx++){
						//console.log(modalHTML[idx]);
						if (modalHTML[idx].id == my_parent[0].id){
							console.log("We have a match! Setting HTML...");
							my_modalHTML = modalHTML[idx];
							break;
						}
					}
					
					$('#imgModalTitle').empty();
					$('#imgModalBody').empty();
					$('#imgModalTitle').html(my_modalHTML.title);
					$('#imgModalBody').html(my_modalHTML.body);
					
					$('#imgModal').modal('show');
				});
			}	
		}
	}
};

// Main point of entry....
$(document).ready(function(){
	console.log("Grabbing 'tabs-template'");
	
	var source = $('#tabs-template').html();
	tabs_template = Handlebars.compile(source);
	
	// Render the date into our compiled template
	var html = tabs_template(animals_data);
	console.log("Outputting TAB html to page!");
	$('#animal_kingdom').html(html);
	
	AnimalKingdom.galleryModalize();
});

