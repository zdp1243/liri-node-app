```js

require("dotenv").config();

```

var Twitter = require('twitter');
 
//var client = new Twitter({
//  consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });


  client.get(path, params, callback);
client.post(path, params, callback);
client.stream(path, params, callback);


  var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

//Retrieves last 20 Tweets (copied from npm Twitter)
var params = {
    screen_name: 'yourTwitterUsername'
} && {
    count: 20
};


