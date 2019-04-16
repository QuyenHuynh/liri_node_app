# liri_node_app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns back data.

LIRI has a total of four commands which can be used to retrieve data on concerts, songs, and movies.

## How to Use

Clone this repository onto your device.
Open up your terminal and navigate to the root project folder.
Use the terminal command `npm install` to install the required node modules needed to run this code.

Now, type any one of these commands into your command line: 

1. `node liri concert-this <artist name>`
2. `node liri spotify-this-song <song title>`
3. `node liri movie-this <movie title>`
4. `node liri do-what-it-says`

Hit enter, and viola!

The data you've requested has now magically appeared onto your terminal screen and is logged into a file called log.txt

##### Example 1

![concert-this](../master/screenshots/concert-this.png)

##### Example 2

![spotify-this-song](../master/screenshots/spotify-this.png)

##### Example 3

![movie-this](../master/screenshots/movie-this.png)

##### Example 4

![do-what-it-says](../master/screenshots/do-what.png)

## Technologies Used

* Javascript
* Node.js
* Node packages:
    * Node-Spotify-API
    * Request
    * Moment
    * Dotenv
* APIs used:
    * Bands in Town
    * OMDB

