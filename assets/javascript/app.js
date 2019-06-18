// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdRdM0wRbgX7H9qfjB0RoiireZHu-qwWI",
    authDomain: "train-scheduler-cc890.firebaseapp.com",
    databaseURL: "https://train-scheduler-cc890.firebaseio.com",
    projectId: "train-scheduler-cc890",
    storageBucket: "train-scheduler-cc890.appspot.com",
    messagingSenderId: "154420913618",
    appId: "1:154420913618:web:9ab564e88d82ae7f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Variables
// ================================================================================

    // Get a reference to the database service
    var database = firebase.database();
    var name = "";
    var destin = "";
    var time;
    var freq;


// Functions
// ================================================================================

    // On Click
    $("#submitBtn").on("click", function(e) {
        e.preventDefault();
        console.log("clicked");

        name = $("#trainName").val().trim();
        destin = $("#destination").val().trim();
        time = $("#trainTime").val().trim();
        freq = $("#frequency").val().trim();

        // FIRST TIME
        var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // CURRENT TIME
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // DIFFERENCE BETWEEN TIMES
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // TIME APART 
        var tRemainder = diffTime % freq;
        // console.log(tRemainder);
        
        // MINS UNTIL TRAIN
        var tMinutesTillTrain = freq - tRemainder;
        var minutesUntil = tMinutesTillTrain.toString();
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // NEXT TRAIN
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var trainNext = nextTrain.toString();
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // console.log(name);
        // console.log(destin);
        // console.log(time);
        // console.log(freq);

        // Code for the push
        database.ref().push({

            train: name,
            destination: destin,
            frequency: freq,
            nextArrival: trainNext,
            minsUntil: minutesUntil,
        
        });

    });

// Firebase watcher + initial loader
// ================================================================================

    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        // console.log(childSnapshot.val().train);
        // console.log(childSnapshot.val().destination);
        // console.log(childSnapshot.val().departure);
        // console.log(childSnapshot.val().frequency);

        // full list of items to the table
        $(".train-table").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + childSnapshot.val().minsUntil + "</td></tr>");

        // Handle the errors
        }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

        