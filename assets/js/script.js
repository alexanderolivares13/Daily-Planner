// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveButton = $(".saveBtn");

var timeCounter = function () {
  var currentTime = dayjs().format("MMM DD, YYYY HH:mm:ss a");
  $("#currentDay").text(currentTime);
};

$(timeCounter());

$(setInterval(timeCounter, 1000));
var currentHour = dayjs().hour();

$(".time-block").each(function () {
  var blockHour = $(this).attr("id").split("-")[1];
  blockHour = parseInt(blockHour);
  
  if (blockHour === currentHour){
    $(this).addClass("present")
  } else if (blockHour < currentHour) {
    $(this).addClass("past")
  } else if (blockHour > currentHour) {
    $(this).addClass("future")
  }

});

$(
  saveButton.on("click", function () {
    var hourId = "#" + this.parentElement.id;
    var plans = $(hourId).children("textarea").val();
    localStorage.setItem(hourId, plans);
  })
);

for (var i = 0; i < localStorage.length; i++) {
  var storageKey = localStorage.key(i).split("#")[1];
  var displayAgenda = localStorage.getItem("#" + storageKey);
  $("#" + storageKey)
    .children("textarea")
    .text(displayAgenda);
}

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
