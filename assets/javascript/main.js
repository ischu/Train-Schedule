// $(document).ready(function () {
// });

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAsR908qTP52Ik_-OlkiDu_xxWFJOQiEFs",
    authDomain: "train-time-baby.firebaseapp.com",
    databaseURL: "https://train-time-baby.firebaseio.com",
    projectId: "train-time-baby",
    storageBucket: "",
    messagingSenderId: "597322626556"
};
firebase.initializeApp(config);
// log current time
console.log("current time is: " + moment().format("YYYY-MM-DD HH:mm"));

// global variables
var database = firebase.database();
var currentTime = moment();
// functions

// NOTE: this function assumes the "first train time" is not today
nextArrival = function (firstTrain, frequency) {
    // first train time converted
    oneTime = moment(firstTrain, "Hmm");
    // first train time set as variable to be manipulated
    otherTime = moment(oneTime);
    // adds frequency to first train time in minutes until it is after current time
    if (otherTime.isAfter(currentTime)) {
        otherTime.subtract(1, "day");
        while (otherTime.isBefore(currentTime)) {
            otherTime.add(parseInt(frequency), "minutes");
            // console.log(otherTime.format("HH:mm"));
        };
        return otherTime.format("HH:mm");
    } else {
        while (otherTime.isBefore(currentTime)) {
            otherTime.add(parseInt(frequency), "minutes");
            // console.log(otherTime.format("HH:mm"));
        };
        return otherTime.format("HH:mm");
    }
};


minutesAway = function (firstTrain, frequency) {
    nextArvl = nextArrival(firstTrain, frequency);
};
minutesAway("1200", "30");
// events
$("form button").on("click", function (event) {
    event.preventDefault();
    console.log("choooooo-chooooooooo");
    // function grabs values from inputs
    getVal = function (x) {
        return $("#" + x + "Input").val().trim();
    }
    // add data to firebase
    database.ref().push({
        Train_Name: getVal("name"),
        Destination: getVal("dest"),
        First_Arrival: getVal("arrival"),
        Frequency: getVal("freq"),
    });
    // clears form inputs
    $("form").trigger("reset");
});

database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val()["Train_Name"]);
    let tRow = $("<tr>");
    let newName = $("<td scope='col'>").text(childSnap.val()["Train_Name"]);
    let newDest = $("<td scope='col'>").text(childSnap.val()["Destination"]);
    let newFreq = $("<td scope='col'>").text(childSnap.val()["Frequency"]);
    let newNext = $("<td scope='col'>").text(nextArrival(childSnap.val()["First_Arrival"], childSnap.val()["Frequency"]));
    $(tRow).append(newName, newDest, newFreq, newNext);
    $("tbody").append(tRow);

});