require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

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

                var concertInfo = [
                    "_______________________EVENT INFORMATION_____________________" ,
                    "Venue name: " + venueName,
                    "Concert date: " + concertDate,
                    "Country: " + country,
                    "City: " + city + "\n",
                ].join("\n");

                console.log(concertInfo);

                fs.appendFile("log.txt", concertInfo, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        return true;
                    }
                });

            }

        });
}

function musicSearch(searchTerm) {
    if (!searchTerm) {
        searchTerm = 'The Sign';
    }
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var data = data.tracks.items

        for (i = 0; i < data.length; i++) {
            var title = data[i].name;
            var artist = data[i].artists[0].name;
            var url = data[i].preview_url;
            var album = data[i].album.name;

            var songInfo = [
                "_________________________SONG INFORMATION__________________________" ,
                "Artist(s): " + artist,
                "Song Name: " + title,
                "Preview Link: " + url,
                "Album: " + album + "\n",
            ].join("\n")

            console.log(songInfo);

            fs.appendFile("log.txt", songInfo, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    return true;
                }
            });
        }
    });
}

function movieSearch(searchTerm) {
    if (!searchTerm) {
        searchTerm = 'Mr. Nobody';
    }
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy").then(
        function (response) {

            var data = response.data;
            var movieInfo = [
                "_________________________MOVIE INFORMATION________________________" ,
                "Title: " + data.Title,
                "Year: " + data.Year,
                "Actors: " + data.Actors,
                "Country: " + data.Country,
                "Language: " + data.Language,
                "IMDB Rating:" + data.Ratings[0].Value,
                "Rotton Tomatoes Rating: " + data.Ratings[1].Value,
                "Plot: " + data.Plot + "\n",
            ].join("\n");

            console.log(movieInfo);

            fs.appendFile("log.txt", movieInfo, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    return true;
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