require("dotenv").config();

const request = require("request");
const keys = require("./keys.js");

var whichFunction = process.argv[2];
var searchItem = process.argv[3];

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);

var Twitter = require("twitter");
var client = new Twitter(keys.twitterKeys);

function twitterThis() {
  var params = { screen_name: "JJPowerWrites" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error && response.statusCode === 200) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        {
          count: 20;
        }
      }
    } else {
      console.log(error);
    }
  });
}

//OMDB API
function movieThis() {
  //   var request = require("request");

  console.log("movies");
  // Store all of the arguments in an array
  var nodeArgs = process.argv;
  var searchItem = process.argv[3];
  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all the words in the node argument
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }

  if (!searchItem) {
    movieName = "Mr. Nobody";
    console.log(
      "If you haven't watched Mr. Nobody, then you should--it's on Netflix! <http://www.imdb.com/title/tt0485947/>"
    );
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("Title:  " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log(
        "Rotten Tomatoes Rating:  " + JSON.parse(body).Ratings[1].Value
      );
      console.log("Country in which Produced:  " + JSON.parse(body).Country);
      console.log("Language:  " + JSON.parse(body).Language);
      console.log("Plot Synopsis:  " + JSON.parse(body).Plot);
      console.log("Actors:  " + JSON.parse(body).Actors);
    } else {
      console.log("There was an error with your request.  Please try again.");
    }
  });
}

//Spotify API
function spotifyThis() {
  if (!searchItem) {
    searchItem = "I Saw the Sign";
  }
  spotify.search({ type: "track", query: searchItem }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var items = data.tracks.items;
    // console.log(items[0]);
    // for (var i = 0; i < items.length; i++) {
    // console.log(items[i]);
    console.log("Artists name: " + items[0].artists[0].name);
    console.log("Song title:  " + items[0].name);
    console.log("Preview link:  " + items[0].preview_url);
    console.log("Album:  " + items[0].album.name);
    // }
  });
}

//Do What it Says
// //function saysThis() {
//Need to make function run saysThis when 'node liri.js do-what-it-says' is entered as a command in the terminal. This function should link to random.txt, push text in random.txt into an array, make a for loop with Math.random to choose one of the random commands and generate a new command for 'node liri.js <random selection> and run it through the other functions (OMDB, Spotify...).
//commands, then hav
// }

switch (whichFunction) {
  case "movie-this":
    movieThis();
    break;
  case "my-tweets":
    twitterThis();
    break;
  case "spotify-this-song":
    spotifyThis();
    break;
  case "do-what-it-says":
    saysThis();
    break;
  default:
    console.log("This is not a valid command.");
}
