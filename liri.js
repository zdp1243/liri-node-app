require("dotenv").config();

const request = require("request");
const keys = require("./keys.js");
//const text = require("./random.txt");
const fs = require("fs");

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
function movieThis(item) {
  console.log("movies");
  // Store all of the arguments in an array
  //var nodeArgs = process.argv;
  // var searchItem = item;

  // Create an empty variable for holding the movie name
  var movieName = item;

  // Loop through all the words in the node argument
  // for (var i = 3; i < nodeArgs.length; i++) {
  //   if (i > 3 && i < nodeArgs.length) {
  //     movieName = movieName + "+" + nodeArgs[i];
  //   } else {
  //     movieName += nodeArgs[i];
  //   }
  // }

  if (!item) {
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

function spotifyThis(item) {
  var searchItem = item;
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

function saysThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    var dataArray = data.split("\n");
    // console.log(dataArray);
    var random = dataArray[Math.floor(Math.random() * dataArray.length)];
    console.log(random);
    var choice = random.split("'");
    console.log(choice);
    console.log(typeof choice[0]);
    console.log(typeof choice[1]);
    if (choice[0] == "movie-this ") {
      movieThis(choice[1]);
    } else {
      spotifyThis(choice[1]);
    }
  });
}

//Switch Function

switch (whichFunction) {
  case "movie-this":
    movieThis(searchItem);
    break;
  case "my-tweets":
    twitterThis();
    break;
  case "spotify-this-song":
    spotifyThis(searchItem);
    break;
  case "do-what-it-says":
    saysThis();
    break;
  default:
    console.log("This is not a valid command.");
}
