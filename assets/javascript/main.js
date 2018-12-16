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

// global variables
var database = firebase.database();
var currentTime = moment();
// functions
nextArrival = function(firstArrival, frequency){
    console.log("current time is: "+moment().format('HH:mm'));
    // converted first arrival time moment(firstArrival, 'Hmm').format('HH:mm')
    let nextArvl = moment(firstArrival, 'hmm').format('HHmm');
    // converted frequency moment(frequency, 'mm').format('mm')
    let freqMin = parseInt(moment(frequency, 'mm').format('HHmm'));
    // current time, converted
    let t = parseInt(currentTime.format('HHmm'));
    console.log(nextArvl, freqMin, t);
    // iterate first arrival by frequency until greater than current time
    do{
        nextArvl = moment(nextArvl, "hmm").add(freqMin, 'm').format('HHmm');
        result = parseInt(nextArvl);
    }while(result<t);
    console.log(nextArvl);
    return moment(nextArvl, "HHmm").format('HH:mm');
};
nextArrival("1200", "30");

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
console.log(moment().startOf('month').fromNow());