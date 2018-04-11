# liri-node-app

Language Interpretation and Recognition Interface

The liri.js node app is used by typing: node liri.js
(then one of the following commands: my-tweets, spotify-this-song "<name of song>" , movie-this "<name of movie>", 'do-what-it says') and then the enter key.

node liri.js my-tweets : will show my last 20 tweets in Twitter.

node liri.js spotify-this-song "<name of song>" : will use the spotify API to give the name of the artist(s), the song name, a preview link of the song from Spotify, and the album name. If no song is entered, it will default to "I Saw the Sign".

node liri.js movie-this "<name of movie>" : will use the OMDB API to return information on the title of the movie in the query. The title, release year, IMDB rating, Rotten Tomatoes rating, country in which it was produced, language, plot and a list of major actors will be listed. If no movie title is search for, the default movie query is for "Mr. Nobody".

node liri.js do-what-it-says : would choose search commands randomly from the random.txt file and display the results.
