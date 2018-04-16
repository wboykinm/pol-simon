"use strict"

let lyrics = require('node-lyrics');
let artist = 'Paul Simon'

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
      lyrics.parseLyrics(artist, songList[s], function(err, p) {
        console.log(artist + ' - ' + songList[s])
        if (err) {
          console.log(err)
        }
        console.log(p)
      })
    }
  }
});