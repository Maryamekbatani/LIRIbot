//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var omdb = require('omdb');
var client = new twitter(keys.twitterKeys);
var fs = require('fs');

//1. `node liri.js my-tweets`

//   * This will show your last 20 tweets and when they were created at in your terminal/bash window.


//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
//movie or song
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}



//////////////////////////////




//if (command === "my-tweets") {
//  showTweets();
//}
//else if (command === "spotify-this-song") {
//    if(x){
//        spotifySong(x);
//    } else{
//        spotifySong("The Sign");
//    }
//}
//else if (command === "movie-this") {
//    if(x){
//        omdbData(x)
//    } else {
//        omdbData("Mr.Nobody")
//    }
//}
//else if (command === "do-what-it-says"){
//    doThing();
//}
//else{
//    console.log("Please enter a command");
//}

////////////////////////////////////////////////////
//switch case

    
switch(command){
  case "my-tweets":
    showTweets();
  break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}



//////show tweets function, displays last 20 tweets

function showTweets(){
    var screenName = {screen_name: 'mmeyzzz'};
    function showTweets(){
  
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){ 
      if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@mmeyzzz: " + tweets[i].text + " Posted @: " + date.substring(0, 19));
        console.log("-----------------");
        
        //adds text to log.txt file
        fs.appendFile('log.txt', "@mmeyzzz: " + tweets[i].text + " Posted @: " + date.substring(0, 19));
        fs.appendFile('log.txt', "-----------------");
      }
    }else{
      console.log('Error occurred');
    }
  });
}
};

//////output information about movie

function movie-this(){
      var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}
};

    







