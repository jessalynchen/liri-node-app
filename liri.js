require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var client = new twitter(keys.twitter);
var fs = require("fs");
//my variables
var nodeArgv = process.argv;
var command = process.argv[2];



//movie or song
var s = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>=3 && i<nodeArgv.length){
    s = s + "+" + nodeArgv[i];
  } else{
    s =  + nodeArgv[i];
  }
}

switch(command)
{
    case 'my-tweets':
        ShowTweets();
        break;
    case 'spotify-this-song':
        if(s)
        {
            SpotifySong(s);
        }
        else
        {
            SpotifySong("The Sign");
        }
        break;
    case 'movie-this':
        if(s)
        {
            movie(s);
        }
        else
        {
            movie("Mr. Nobody");
        }
        break;
    case 'do-what-it-says':
        doWhatSays();
        break;
    
    default:
        console.log("Please enter command: my-tweets,  spotify-this-song, movie-this, do-what-it-says");
        break;
}

function ShowTweets()
{
    var params = {screen_name: 'JessalynCodes'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(!error)
        {
            for(var i = 0; i < tweets.length; i++)
            {
                var date = tweets[i].created_at;

                console.log(`@jessalyncodes: ${tweets[i].text} Created At: ${date.substring(0,19)}`);
                console.log(" ");

                
                fs.appendFile("log.txt", "@jessalyncodes " +tweets[i].text +  "Created At: " + date.substring(0,19) + "\n");
                fs.appendFile("log.txt", "--------------------- \n");
            }
        }
        else
        {
            console.log(error);
        }
    });
}

function SpotifySong(song)
{
    spotify.search({type: "track", query: song}, function(error, data){
        if(!error)
        {
            
            for(var i = 0; i < data.tracks.items.length; i++)
            {
                
                var songinfo = data.tracks.items;
                console.log(`Artist: ${songinfo.artists[0].name}`);
                console.log(`Song: ${songinfo.name}`);
                console.log(`Preview URL: ${songinfo.preview_url}`);
                console.log(`Album: ${songinfo.album.name}`);

              
                fs.appendFile("log.txt", `Artist: ${songinfo.artists[0].name}`);
                fs.appendFile("log.txt", `Song: ${songinfo.name}`);
                fs.appendFile("log.txt", `Preview URL: ${songinfo.preview_url}`);
                fs.appendFile("log.txt", `Album: ${songinfo.album.name}`);
                fs.appendFile("log.txt","--------------------- \n");
            }
        }
        else
        {
            console.log(error);
        }
    });
}

function movie(omdbmovie)
{
    var url = 'http://www.omdbapi.com/?i=tt3896198&apikey=3f7cc425&t=' + omdbmovie + '&plot=short&tomatoes=true';

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200)
        {
            var body = JSON.parse(body);

            console.log(`Title: ${body.Title}`);
            console.log(`Release Year: ${body.Year}`);
            console.log(`IMdB Rating: ${body.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${body.tomatoRating}`);
            console.log(`Country: ${body.Country}`);
            console.log(`Language: ${body.Language}`);
            console.log(`Plot: ${body.Plot}`);
            console.log(`Actors: ${body.Actors}`);
            
            fs.appendFile("log.txt", `Title: ${body.Title} \n`);
            fs.appendFile("log.txt", `Release Year: ${body.Year} \n`);
            fs.appendFile("log.txt", `IMdB Rating: ${body.imdbRating} \n`);
            fs.appendFile("log.txt", `Rotten Tomatoes Rating: ${body.tomatoRating} \n `);
            fs.appendFile("log.txt", `Country: ${body.Country} \n`);
            fs.appendFile("log.txt", `Language: ${body.Language} \n`);
            fs.appendFile("log.txt", `Plot: ${body.Plot} \n`);
            fs.appendFile("log.txt", `Actors: ${body.Actors} \n`);
            fs.appendFile("log.txt", "--------------------- \n");
        }
        else
        {
            console.log(error);
        }

        if(!omdbmovie)
        {
            console.log(" ");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \n It's on Netflix!");
            
            fs.appendFile("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ \n It's on Netflix!");

        }
    });
}

function doWhatSays()
{
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
    
        SpotifySong(txt[1]);
      });
}
