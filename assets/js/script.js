// setting the variable for the save button in the HTML using jQuery
var saveButton = $(".saveBtn");
var currentHour = dayjs().hour();

// declaring the function for the time on the HTML page
var timeCounter = function () {
  var currentTime = dayjs().format("MMM DD, YYYY HH:mm:ss a");
  $("#currentDay").text(currentTime);
};

// an interval to make sure the time shows accordingly per 1 second
$(setInterval(timeCounter, 1000));

//calling the function using jQuery to ensure it doesn't load before the page finishes loading
$(timeCounter());

// declaring the function that saves all the text in the textarea element to local storage
$(
  saveButton.on("click", function () {
    //  this refers the current section where the saveBtn class is being set to, further pointing to the parent element and obtaining the id. and re-adding the # symbol to set the key value for local storage to later be used to retrieve the text value.
    var hourId = "#" + this.parentElement.id;
    // a var to save the value from the textarea element
    var plans = $(hourId).children("textarea").val();
    localStorage.setItem(hourId, plans);
  })
);

// declaring the function to obtain all hours for the seperate time divs to be used for the logical comparison that determines what class the function will add based on the time of day.
$(".time-block").each(function () {
// the function will go through every element with the class of ".time-block" and obtain the id and split it into an array at the using the "-" as the delimiter. leaving only the hour number left to be selected
  var blockHour = $(this).attr("id").split("-")[1];
  
// the function then convers the selected hour numbers which are currently strings and parses them into intergers based on a 24 hour clock.
  blockHour = parseInt(blockHour);

// the function then compares the parsed hour based on the element that it is attributed to and adds the appropriate past, present, or future class to properly display the color based on the current hour.
  if (blockHour === currentHour) {
    $(this).addClass("present");
  } else if (blockHour < currentHour) {
    $(this).addClass("past");
  } else if (blockHour > currentHour) {
    $(this).addClass("future");
  }
});

// the for loop generates the keys to be able to retrieve the saved "plans" from local storage to be able to re-display them on the page
for (var i = 0; i < localStorage.length; i++) {
// the storage key is obtained and split into an array using the # as a delimiter and returning only the hour + "hour number"
  var storageKey = localStorage.key(i).split("#")[1];
// the key is then "re-assembled" to force the for loop to iterate through every key
  var displayAgenda = localStorage.getItem("#" + storageKey);
  // since the key is also the id of the div in the HTML it is used to also display the value obtained from the local storage
  $("#" + storageKey).children("textarea").text(displayAgenda);
}
