"use strict"

let lyrics = require('node-lyrics');
let l = require("lyric-get");

let artist = process.argv[2]

lyrics.getArtist(artist, function(err, data) {
  if (err) {
    console.log(err)
  }
  // an array of JSON about each album
  let albumList = data.albums
  for (let i = 0; i < albumList.length; i++) {
    // an array of the songs on each album
    let songList = albumList[i].songs
    for (let s = 0; s < songList.length; s++) {
      // retrieve lyrics for each song
      l.get(artist, songList[s], function(err, res){
        if (!err) {
          // get rid of all the blank lines
          let linesOnly = res.replace(/^\s*$[\n\r]{1,}/gm, '');
          console.log(linesOnly);
        }
      })
    }
  }
});


