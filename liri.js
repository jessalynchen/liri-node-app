
require("dotenv").config();

console.log(keys.js);
var importKeys = require("keys.js").config();

//access keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// //Show the last 20 tweets
// `my-tweets`

// //Show the following song in terminal - artist, song name, preview link , albumn of song
// //use the node spotify api
// //use the node-spotify-api package
// `spotify-this-song`

// //node liri.js movie-this '<movie name here>'
// //output from API You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.xz 
// //    * Title of the movie.
// //    * Year the movie came out.
// //    * IMDB Rating of the movie.
// //    * Rotten Tomatoes Rating of the movie.
// //    * Country where the movie was produced.
// //    * Language of the movie.
// //    * Plot of the movie.
// //    * Actors in the movie.
// `movie-this`
// // // # if using the module level client
// // omdb.set_default('apikey', OMDB_KEY)
// // # if creating a new client instance
// client = omdb.OMDBClient(apikey=OMDB_KEY)
// var omdbInfo = omdb.request(t='True Grit', y=1969, plot='full', tomatoes='true', timeout=5)
// console.log(omdbInfo); 

// // node liri.js do-what-it-says
// // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// // Feel free to change the text in that document to test out the feature for other commands.
// `do-what-it-says`
