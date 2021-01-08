// Sets the current time
let presentTime = moment();
//sets the current date and formats it
let todayDate = moment().format("dddd, MMMM Do, YYYY");

//Push date to the HTML
$("#currentDay").text(todayDate);
//console.log(todayDate);

// Loop for creating the table
for (i = 0; i < 9; i++) {

    // creating div for each row
    let rowBox = $("<div>").addClass("row");
    // creating the time box for each hour
    let timeBox = $("<div>").addClass("hour col-md-1").text(moment("9:00 am", "hh:mm a").add(i, "hours").format("ha"));
    //sets the hour for each timebox
    timeBox.attr("data-time", moment("9:00 am", "hh:mm a").add(i, "hours").format("ha"));
    //creates the text area for entering and displaying your tasks
    let taskBox = $("<textarea>").addClass("col-md-10");
    //creates the save button
    let saveButton = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save"></i>');
    //adds the row box to the container
    $(".container").append(rowBox);

    //Adds in the 3 items to each row
    $(rowBox).append(timeBox, taskBox, saveButton);

    //Able to achieve this in the line above
    // $(timeBox).append(taskBox);
    // $(taskBox).append(saveButton);
    
    //If statement for determining if the event is in the past, present, or future
    //present statement
    if (presentTime.isSame(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("present");
    //future statement
    } else if (presentTime.isBefore(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("future");
    //past statement
    } else if (presentTime.isAfter(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("past");
    }    

    //function for getting saved items from the local storage
    $(document).ready(function() {
        scheduleArray = $(".hour").toArray();
    
        for (i = 0; i < scheduleArray.length; i++) {
            $(scheduleArray[i]).siblings("textarea").text(localStorage.getItem($(scheduleArray[i]).attr("data-time")));
        }
    });
}

// Added this part of the code into the for loop above
// $(document).ready(function() {
//     scheduleArray = $(".hour").toArray();

//     for (i = 0; i < scheduleArray.length; i++) {
//         $(scheduleArray[i]).siblings("textarea").text(localStorage.getItem($(scheduleArray[i]).attr("data-time")));
//     }
// });

//Event for saving the entered activity to the local storage
$(".saveBtn").on("click", function() {

    localStorage.setItem($(this).siblings("div.hour").attr("data-time"), $(this).siblings("textarea").val())
})
