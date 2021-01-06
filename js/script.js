// Set the correct date
let presentTime = moment();
let currentDate = moment().format("dddd, MMMM Do, YYYY");

//Push date to the HTML
$("#currentDay").text(currentDate);
//console.log(currentDate);

// Loop for creating the table
for (i = 0; i < 9; i++) {


    let rowBox = $("<div>").addClass("row");

    let timeBox = $("<div>").addClass("hour col-md-1").text(moment("9:00 am", "hh:mm a").add(i, "hours").format("ha"));

    timeBox.attr("data-time", moment("9:00 am", "hh:mm a").add(i, "hours").format("ha"));

    let taskBox = $("<textarea>").addClass("col-md-10");

    let saveButton = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save"></i>');

    $(".container").append(rowBox);

    $(rowBox).append(timeBox, taskBox, saveButton);

    // $(timeBox).append(taskBox);

    // $(taskBox).append(saveButton);

    if (presentTime.isSame(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("present");

    } else if (presentTime.isBefore(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("future");

    } else if (presentTime.isAfter(moment("9:00 am", "hh:mm a").add(i, "hours"), "hour")) {
        $(taskBox).addClass("past");
    }    

    $(document).ready(function() {
        scheduleArray = $(".hour").toArray();
    
        for (i = 0; i < scheduleArray.length; i++) {
            $(scheduleArray[i]).siblings("textarea").text(localStorage.getItem($(scheduleArray[i]).attr("data-time")));
        }
    });
}

// $(document).ready(function() {
//     scheduleArray = $(".hour").toArray();

//     for (i = 0; i < scheduleArray.length; i++) {
//         $(scheduleArray[i]).siblings("textarea").text(localStorage.getItem($(scheduleArray[i]).attr("data-time")));
//     }
// });

$(".saveBtn").on("click", function() {

    localStorage.setItem($(this).siblings("div.hour").attr("data-time"), $(this).siblings("textarea").val())
})
