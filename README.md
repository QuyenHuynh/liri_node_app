# liri_node_app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns back data.

LIRI has a total of four commands which can be used to retrieve data on concerts, songs, and movies.
After each command, the data is also logged into the file log.txt

## How to Use

Clone this repository onto your device.
Open up your terminal and navigate to the root project folder.
Use the terminal command `npm install` to install the required node modules needed to run this code.

Now, type any one of these commands into your command line: 

1. `node liri concert-this <artist name>`

### Example 1

<img src="../master/screenshots/concert-this.png" width="616px" height="381.5px">

2. `node liri spotify-this-song <song title>`

### Example 2

<img src="../master/screenshots/spotify-this.png" width="611.55px" height="343.8px">

3. `node liri movie-this <movie title>`

### Example 3

<img src="../master/screenshots/movie-this.png" width="752.5px" height="142px">

4. `node liri do-what-it-says`

### Example 4

<img src="../master/screenshots/do-what.png" width="616.5px" height="345.6px">

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

