require("dotenv").config();

var axios = require("axios");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

// node liri.js concert-this <artist name>
// node liri.js spotify-this-song <song title>
// node liri.js movie-this <movie title>
// node liri.js do-what-it-says

function main(command, searchTerm) {
    switch (command) {
        case 'concert-this':
            concertSearch(searchTerm);
            break;
        case 'spotify-this-song':
            musicSearch(searchTerm);
            break;
        case 'movie-this':
            movieSearch(searchTerm);
            break;
        case 'do-what-it-says':
            doThis();
            break;
        default:
            console.log("\nError. Please check that you've correctly input one of the following commands: \n1. concert-this \n2. spotify-this-song \n3. movie-this \n4. do-what-it-says");
    }
}
main(command, searchTerm);

function concertSearch(searchTerm) {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
        function (response) {
            var data = response.data;

            for (i = 0; i < data.length; i++) {
                var venueName = data[i].venue.name;
                var concertDate = moment(data[i].datetime).format("MM/DD/YYYY");
                var country = data[i].venue.country;
                var city = data[i].venue.city;
            }
            
            var concertInfo = [
                "Venue name: " + venueName,
                "Concert date: " + concertDate,
                "Country: " + country,
                "City: " + city,
            ].join("\n");

            console.log(concertInfo);

            // fs.appendFile("log.txt", concertInfo, function (err) {
            //     if (err) {
            //         console.log(err);
            //     }
            //     else {
            //         console.log("Content Logged!");
            //     }
            // });
        });
}

function musicSearch(searchTerm) {
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (!searchTerm) {
            searchTerm = "The Sign"; //default track
        }

        var data = data.tracks.items
        var songInfo = [
            "Artist(s): " + data[0].artists[0].name,
            "Song Name: " + data[0].name,
            "Preview Link: " + data[0].preview_url,
            "Album: " + data[0].album.name
        ].join("\n")
        console.log(songInfo);

        fs.appendFile("log.txt", songInfo, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Content Logged!");
            }
        });
    });
}

function movieSearch(searchTerm) {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy").then(
        function (response) {
            if (searchTerm === undefined) {
                searchTerm = "Mr.Nobody"; //default movie
            }

            var data = response.data;
            var movieInfo = [
                "Title: " + data.Title,
                "Year: " + data.Year,
                "Actors: " + data.Actors,
                "Country: " + data.Country,
                "Language: " + data.Language,
                "IMDB Rating:" + data.Ratings[0].Value,
                "Rotton Tomatoes Rating: " + data.Ratings[1].Value,
                "Plot: " + data.Plot,
            ].join("\n");
            console.log(movieInfo);

            fs.appendFile("log.txt", movieInfo, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Content Logged!");
                }
            });
        }
    );
}

function doThis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');

        main(dataArr[0], dataArr[1]);
    });
}