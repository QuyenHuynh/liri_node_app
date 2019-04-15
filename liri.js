require("dotenv").config();

var request = require("request");
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3];
let inputs = {};
inputs[command][input]();

function main(command) {
    if (command === "concert-this") {
        concertInfo();
    }
    else if (command === "spotify-this-song") {
        songInfo();
    }
    else if (command === "movie-this") {
        movieInfo();
    }
    else if (command === "do-what-it-says") {
        showInfo();
    } else {
        console.log("Invalid command.")
        console.log("Please type a command from the following list: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}
main();

function concertInfo() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response);
        }
    )
}

function songInfo() {
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function movieInfo() {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(
        function (response) {
            console.log(response);
        }
    );


}

function showInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        //error handling
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}
// Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`

//`node liri.js concert-this <artist/band name here>`
// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")

// `node liri.js spotify-this-song '<song name here>'`

bandsQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"