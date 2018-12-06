//Global Variables

var gifs = ["baseball", "basketball", "football", "soccer", "golf", "mlb", "nba", "nfl", "mls", "pga"];

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EX1IL7kkzCLr1MLYfMV9JmzSRkLaaIAx";

var queryTerm = "";

var buttonClicked = true;

// Generate starting page buttons
function renderButtons(){

    $(".gifButtons").empty();

    for(var i = 0; i < gifs.length; i++){

    var gifBtn = $("<button>");
    gifBtn.addClass("btn btn-primary col-md-2 gifBtnS");
    gifBtn.attr("id", 'gif-' + i);
    gifBtn.attr("value", gifs[i]);

    gifBtn.text(gifs[i]);

    $(".gifButtons").append(gifBtn);
}
}

//Capitalize gif title function

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


// Generate gifs function

function generateGifs(builtQuery){

    $.ajax({url: builtQuery, methos: "GET"}).done(function(gifData){

        

        for(var i = 0; i < gifData.data.length; i++){

        var gifBox = $("<div>")
        gifBox.attr('id', 'gifBox')

        var titleUpperCase = gifData.data[i].title.capitalize();

       

        var title = $("<h3>" + titleUpperCase + "</h3>");
     
        var rating = $("<h5>" + "Rated: " + gifData.data[i].rating + "</h5>");
        
        var pause = $("<p>");
        pause.text("Click to pause:");
    
        var image = $("<img id='picture'>").attr("src", gifData.data[i].images.fixed_height.url);
            image.attr("data-state", "animate")
            image.attr("data-animate", gifData.data[i].images.fixed_height.url)
            image.attr("data-still", gifData.data[i].images.fixed_height_still.url)
            
        
        


        gifBox.append(title);
        gifBox.append(rating);
        gifBox.append(pause);
        gifBox.append(image);


      
        

        $(".gifView").append(gifBox);
        

        }
    })

}


// Adding a new gif button

$(document).on("click", ".submit", function(event){

    event.preventDefault();

    var gifName = $("#newGif").val().trim();

    console.log(gifName)

    gifs.push(gifName)

    renderButtons();
});


// Gif buttons clicked

$(document).on("click", ".gifBtnS", function(e){

    $(".gifView").empty()

        queryTerm = e.currentTarget.value;

        var newURL = queryURL + "&q=" + queryTerm + "&limit=10&offset=0&lang=en";

        


        generateGifs(newURL)


})


// Gifs clicked 

$(document).on("click", "#picture", function(){

    console.log($(this))

    var state = $(this).attr("data-state");
    
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    
})

renderButtons();