require("dotenv").config();
var importKeys = require("keys.js").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
