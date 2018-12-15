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

$("form button").on("click", function(event){
    event.preventDefault();
    console.log("choooooo-chooooooooo");
    getVal = function(x){
        return $("#"+x+"Input").val().trim();
    }
    // input data assigned to variables
    let newName = getVal("name");
    let newDest = getVal("dest");
    let newArrival = getVal("arrival");
    let newFreq = getVal("freq");
    // add data to firebase
    database.ref().push({
        Train_Name: newName,
        Destination: newDest,
        First_Arrival: newArrival,
        Frequency: newFreq,
    });
    console.log(newName, newDest, newArrival, newFreq);
    // clears form inputs
    $("form").trigger("reset");
});
