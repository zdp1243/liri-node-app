require("dotenv").config();

const request = require("request");
const keys = require("./keys.js");

var whichFunction = process.argv[2];
var searchItem = process.argv[3];

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);

var Twitter = require("twitter");
var client = new Twitter(keys.twitterKeys);

// function twitterThis() {
//   client.get("favorites/list", function(error, tweets, response) {
//     if (error) throw error;
//     console.log(tweets); // The favorites.
//     console.log(response); // Raw response object.
//   });

//   client.post("statuses/update", { status: "I Love Twitter" }, function(
//     error,
//     tweet,
//     response
//   ) {
//     if (error) throw error;
//     console.log(tweet); // Tweet body.
//     console.log(response); // Raw response object.
//   });

//   var stream = client.stream("statuses/filter", { track: "javascript" });
//   stream.on("data", function(event) {
//     console.log(event && event.text);
//   });

//   stream.on("error", function(error) {
//     throw error;
//   });

//   var params = { screen_name: "JJ Power" };
//   client.get("statuses/user_timeline", params, function(
//     error,
//     tweets,
//     response
//   ) {
//     if (!error && response.statusCode === 200) {
//       console.log(tweets);
//       {
//         count: 20;
//       }

//       stream.on("error", function(error) {
//         throw error;
//       });
//     }
//   });

//   function movieThis() {
//     console.log("movies");
//     // Then run a request to the OMDB API with the movie specified
//     //   request(
//     //     "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy",
//     //     function(error, response, body) {
//     //       // If the request is successful (i.e. if the response status code is 200)
//     //       if (!error && response.statusCode === 200) {
//     //         // Parse the body of the site and recover just the imdbRating
//     //         // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     //  console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//     //       }
//     //     }
//     //   );
//   }

function spotifyThis() {
  if (!searchItem) {
    searchItem = "I Saw the Sign";
  }
  spotify.search({ type: "track", query: searchItem }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var items = data.tracks.items;
    console.log(items[0]);
    // for (var i = 0; i < items.length; i++) {
    // console.log(items[i]);
    //console.log("Artists name: " + items[i].artists[0].name);
    //console.log("Song name:  "  + items[i].artists[].name);
    //console.log("Preview link:  "  + items[i].artists[].name);
    //console.log("Album:  " + items[].artists[].name);
  });
}

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
}
