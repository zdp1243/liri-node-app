//Example from npm twitter
client.get("favorites/list", function(error, tweets, response) {
  if (error) throw error;
  console.log(tweets); // The favorites.
  console.log(response); // Raw response object.
});

//Example from npm twitter
client.post("statuses/update", { status: "I Love Twitter" }, function(
  error,
  tweet,
  response
) {
  if (error) throw error;
  console.log(tweet); // Tweet body.
  console.log(response); // Raw response object.
});
var stream = client.stream("statuses/filter", { track: "javascript" });
stream.on("data", function(event) {
  console.log(event && event.text);
});

stream.on("error", function(error) {
  throw error;
});

// You can also get the stream in a callback if you prefer.
client.stream("statuses/filter", { track: "javascript" }, function(stream) {
  stream.on("data", function(event) {
    console.log(event && event.text);
  });

  //Retrieves last 20 Tweets (copied from npm Twitter)
  var params = {
    screen_name: "yourTwitterUsername"
  } && {
    count: 20
  };

  stream.on("error", function(error) {
    throw error;
  });
});

//From npm twitter
_ = require("lodash");
const isTweet = _.conforms({
  contributors: _.isObject,
  id_str: _.isString,
  text: _.isString
});

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// //var params = {
//     screen_name: 'yourTwitterUsername'
// } && {
//     count: 20
// };

//   stream.on('error', function(error) {
//     throw error;
//   });
// client.get(path, params, callback);
// client.post(path, params, callback);
// client.stream(path, params, callback);
