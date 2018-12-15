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
var database = firebase.database();

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
    // let newArrival = $("<td scope='col'>").text(childSnap.val()["First_Arrival"]);
    // let newFreq = $("<td scope='col'>").text(childSnap.val()["Frequency"]);
    $(tRow).append(newName, newDest);
    $("tbody").append(tRow);

});
