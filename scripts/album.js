 $(document).ready(function() {     
var $seekBars = $('.player-bar .seek-bar');
$(document).on("click",$seekBars,function(event) {
    var offSetLeft = $('.player-bar .seek-bar').offset();
    offSetLeft = offSetLeft["left"];
      var offsetX = event.pageX - offSetLeft;
      var barWidth = $(this).width();
      var seekBarFillRatio = offsetX / barWidth;


      if ($(this).parent().attr('class') == 'seek-control') {
          seek(seekBarFillRatio * currentSoundFile.getDuration());
      } else {
          setVolume(seekBarFillRatio * 100);
      }

      updateSeekPercentage($(this), seekBarFillRatio); 
  });

  $seekBars.find('.thumb').mousedown(function(event) {

              var $seekBar = $(this).parent();

              $(document).bind('mousemove.thumb', function(event) {
                  var offsetX = event.pageX - $seekBar.offset().left;
                  var barWidth = $seekBar.width();
                  var seekBarFillRatio = offsetX / barWidth;

                  if ($seekBar.parent().attr('class') == 'seek-control') {
                      seek(seekBarFillRatio * currentSoundFile.getDuration());
                  } else {
                      setVolume(seekBarFillRatio);
                  }

                  updateSeekPercentage($seekBar, seekBarFillRatio);
              });

              var seek = function(time) {
                  if (currentSoundFile) {
                      currentSoundFile.setTime(time);
                  }
              }
             
  });
              var updateSeekBarWhileSongPlays = function() {
                  if (currentSoundFile) {
                      // #10
                      currentSoundFile.bind('timeupdate', function(event) {
                          // #11
                          var seekBarFillRatio = this.getTime() / this.getDuration();
                          var $seekBar = $('.seek-control .seek-bar');

                          updateSeekPercentage($seekBar, seekBarFillRatio);
                      });
                  } 
              };

              var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
                  console.log("test");
                  var offsetXPercent = seekBarFillRatio * 100;
                  
                  // #1
                  offsetXPercent = Math.max(0, offsetXPercent);
                  offsetXPercent = Math.min(100, offsetXPercent);

                  // #2
                  var percentageString = offsetXPercent + '%';
                  $seekBar.find('.fill').width(percentageString);
                  $seekBar.find('.thumb').css({
                      left: percentageString
                  }); 
              };


              //1 
              var $playPause = $('.main-controls .play-pause');

              $(document).on("click", $playPause, controlFromBar);
     
              //2 

              var controlFromBar = function togglePlayFromPlayerBar() {
                  console.log("working");
                  if (currentSoundFile.isPaused()) {
                      currentSoundFile.play();
                  } else {
                      currentSoundFile.pause();
                  }

              };

              var setSong = function(songNumber) {
                  if (currentSoundFile) {
                      currentSoundFile.stop();
                  }
                  currentlyPlayingSongNumber = parseInt(songNumber);
                  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                  console.log(currentSongFromAlbum["audioUrl"]);
                  // We assign a new Buzz sound object. We've passed the audio file via the  audioUrl property on the currentSongFromAlbum object.
                  currentSoundFile = new buzz.sound(currentSongFromAlbum["audioUrl"], {
                      // we've passed in a settings object that has two properties defined, formats and  preload. formats is an array of strings with acceptable audio formats. We've only included the 'mp3' string because all of our songs are mp3s. Setting the preload property to true tells Buzz that we want the mp3s loaded as soon as the page loads.
                      formats: ['mp3'],
                      preload: true
                  });
                  setVolume(currentVolume);
              };

              var setVolume = function(volume) {
                  if (currentSoundFile) {
                      currentSoundFile.setVolume(volume);
                  }
              };

              var getSongNumberCell = function(number) {
                  return $('.song-item-number[data-song-number="' + number + ' "]'); 
              };

     // pulled this out 
     function clickHandler() {
         console.log($(this).attr("class"));
                      var songNumber = $(this).data('song-number');
      console.log(songNumber);
                      if (currentlyPlayingSongNumber !== null) {
                          // Revert to song number for currently playing song because user started playing new song.
                          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                          currentlyPlayingCell.html(currentlyPlayingSongNumber);
                      }
                      if (currentlyPlayingSongNumber !== songNumber) {
                          // Switch from Play -> Pause button to indicate new song is playing.
                          //$(this).html(pauseButtonTemplate);
                          setSong(songNumber);
                          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                          updatePlayerBarSong();

                          var $volumeFill = $('.volume .fill');
                          var $volumeThumb = $('.volume .thumb');
                          $volumeFill.width(currentVolume + '%');
                          $volumeThumb.css({
                              left: currentVolume + '%'
                          });


                      } else if (currentlyPlayingSongNumber === songNumber) {
                          // Switch from Pause -> Play button to pause currently playing song.
                         // $(this).html(playButtonTemplate);
                          $('.main-controls .play-pause').html(playerBarPlayButton);
                          currentlyPlayingSong = null;
                          currentlyPlayingSongNumber = null;
                          currentSongFromAlbum = null;
                      }
                  };
     //end of pulled out function
     
              var createSongRow = function(songNumber, songName, songLength) {
                  var template =
                      '<tr class="album-view-song-item"><td id="song'+ songNumber + '" class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td><td class="song-item-title">' + songName + '</td><td class="song-item-duration">' + songLength + '</td></tr>';
                  var $row = $(template);
                  function clickHandler() {
                      var songNumber = $(this).attr('data-song-number');
                      if (currentlyPlayingSongNumber !== null) {
                          // Revert to song number for currently playing song because user started playing new song.
                          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                          currentlyPlayingCell.html(currentlyPlayingSongNumber);
                         
                          console.log(currentlyPlayingCell);
                      }
                      if (currentlyPlayingSongNumber !== songNumber) {
                          // Switch from Play -> Pause button to indicate new song is playing.
                         // $(this).html(pauseButtonTemplate);
                          setSong(songNumber);
                          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                          updatePlayerBarSong();

                          var $volumeFill = $('.volume .fill');
                          var $volumeThumb = $('.volume .thumb');
                          $volumeFill.width(currentVolume + '%');
                          $volumeThumb.css({
                              left: currentVolume + '%'
                          });


                      } else if (currentlyPlayingSongNumber === songNumber) {
                          // Switch from Pause -> Play button to pause currently playing song.
                          $(this).html(playButtonTemplate);
                          $('.main-controls .play-pause').html(playerBarPlayButton);
                          currentlyPlayingSong = null;
                          currentlyPlayingSongNumber = null;
                          currentSongFromAlbum = null;
                      }
                  };


                  var onHover = function(event) {
                      var songNumberCell = $(this).find('.song-item-number');
                      var songNumber = songNumberCell.attr('data-song-number');

                      if (songNumber !== currentlyPlayingSongNumber) {
                          songNumberCell.html(playButtonTemplate);
                      }
                  };

                  var offHover = function(event) {
                      var songNumberCell = $(this).find('.song-item-number');
                      var songNumber = songNumberCell.attr('data-song-number');

                      if (songNumber !== currentlyPlayingSongNumber) {
                          songNumberCell.html(songNumber);
                      }
                  };

                  $(document).on("click",'td.song-item-number',function(){
                    console.log($(this).attr("id"));
                      var songNumber = $(this).data('song-number');
      console.log(songNumber);
                      if (currentlyPlayingSongNumber !== null) {
                          // Revert to song number for currently playing song because user started playing new song.
                          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                          currentlyPlayingCell.html(currentlyPlayingSongNumber);
                      }
                      if (currentlyPlayingSongNumber !== songNumber) {
                          // Switch from Play -> Pause button to indicate new song is playing.
                          $(this).html(pauseButtonTemplate);
                          setSong(songNumber);
                          currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                          updatePlayerBarSong();

                          var $volumeFill = $('.volume .fill');
                          var $volumeThumb = $('.volume .thumb');
                          $volumeFill.width(currentVolume + '%');
                          $volumeThumb.css({
                              left: currentVolume + '%'
                          });


                      } else if (currentlyPlayingSongNumber === songNumber) {
                          // Switch from Pause -> Play button to pause currently playing song.
                          $(this).html(playButtonTemplate);
                          $('.main-controls .play-pause').html(playerBarPlayButton);
                          currentlyPlayingSong = null;
                          currentlyPlayingSongNumber = null;
                          currentSongFromAlbum = null;
                      }   
                  });
                  $row.hover(onHover, offHover);
                  return $row;

              };
              albumImage = null;
              albumArtist = null;
              albumTitle = null;
              albumReleaseInfo = null;
              albumSongList = null;

              var setCurrentAlbum = function(album) {
                  currentAlbum = album;
                  $albumTitle = $('.album-view-title');
                  $albumArtist = $('.album-view-artist');
                  $albumReleaseInfo = $('.album-view-release-info');
                  $albumImage = $('.album-cover-art');
                  $albumSongList = $('.album-view-song-list');

                  $albumTitle.text(album.title);
                  $albumArtist.text(album.artist);
                  $albumReleaseInfo.text(album.year + ' ' + album.label);
                  $albumImage.attr('src', album.albumArtUrl);

                  $albumSongList.empty();

                  // #4
                  for (var i = 0; i < album.songs.length; i++) {
                      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
                      $albumSongList.append($newRow);
                  }
              };

              var trackIndex = function(album, song) {
                  return album.songs.indexOf(song);
              };

              var nextSong = function() {

                  var getLastSongNumber = function(index) {
                      return index == 0 ? currentAlbum.songs.length : index;
                  };

                  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
                  // Note that we're _incrementing_ the song here
                  currentSongIndex++;

                  if (currentSongIndex >= currentAlbum.songs.length) {
                      currentSongIndex = 0;
                  }

                  // Set a new current song
                  //currentlyPlayingSongNumber = currentSongIndex + 1;
                  setSong(currentSongIndex + 1);
                  currentSoundFile.play();
                  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

                  // Update the Player Bar information
                  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
                  $('.currently-playing .artist-name').text(currentAlbum.artist);
                  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
                  $('.main-controls .play-pause').html(playerBarPauseButton);

                  var lastSongNumber = getLastSongNumber(currentSongIndex);
                  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
                  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

                  $nextSongNumberCell.html(pauseButtonTemplate);
                  $lastSongNumberCell.html(lastSongNumber);

              };

              var previousSong = function() {

                  // Note the difference between this implementation and the one in
                  // nextSong()
                  var getLastSongNumber = function(index) {
                      return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
                  };

                  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
                  // Note that we're _decrementing_ the index here
                  currentSongIndex--;

                  if (currentSongIndex < 0) {
                      currentSongIndex = currentAlbum.songs.length - 1;
                  }

                  // Set a new current song
                  //currentlyPlayingSongNumber = currentSongIndex + 1;
                  setSong(currentSongIndex + 1);
                  currentSoundFile.play();
                  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

                  // Update the Player Bar information
                  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
                  $('.currently-playing .artist-name').text(currentAlbum.artist);
                  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
                  $('.main-controls .play-pause').html(playerBarPauseButton);

                  var lastSongNumber = getLastSongNumber(currentSongIndex);
                  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
                  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

                  $previousSongNumberCell.html(pauseButtonTemplate);
                  $lastSongNumberCell.html(lastSongNumber);

              };

              var updatePlayerBarSong = function() {

                  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
                  $('.currently-playing .artist-name').text(currentAlbum.artist);
                  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
                  $('.main-controls .play-pause').html(playerBarPauseButton);

              };

              setTimeout(function() {

                  // for (var i = 0; i < songRows.length; i++) {
                 // $(".song-item-number").on('mouseleave', function(event) {
                      // var songItem = getSongItem(event.target);
                      var songItemNumber = $(this).attr('data-song-number');

                      // #2
                      if (songItemNumber !== currentlyPlayingSongNumber) {
                         // $(".songItem") = songItemNumber;
                      }
                  });

                  //   }
              }, 0);


              // Album button templates
              var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
              var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
              var playerBarPlayButton = '<span class="ion-play"></span>';
              var playerBarPauseButton = '<span class="ion-pause"></span>';

              // Store state of playing songs
              var currentAlbum = null;
              var currentlyPlayingSongNumber = null;
              var currentSongFromAlbum = null;
              var currentSoundFile = null;
              var currentVolume = 80;

              var $previousButton = $('.main-controls .previous');
              var $nextButton = $('.main-controls .next');

             
                  setCurrentAlbum(albumPicasso);
                  setupSeekBars();
                  $previousButton.click(previousSong);
                  $nextButton.click(nextSong);
                  for (var i = 0; i < songRows.length; i++) {
                  $(document).on('click', ".song-item-number", function(event) {
                    clickHandler(event.target);
                  });
                  
                  function setupSeekBars() {
                  var $seekBars = $('.player-bar .seek-bar');

                  $seekBars.click(function(event) {
                      // #3
                      var offsetX = event.pageX - $(this).offset().left;
                      var barWidth = $(this).width();
                      // #4
                      var seekBarFillRatio = offsetX / barWidth;

                      // #5
                      updateSeekPercentage($(this), seekBarFillRatio);
                  });

                  $seekBars.find('.thumb').mousedown(function(event) {
                      // #8
                      var $seekBar = $(this).parent();

                      // #9
                      $(document).bind('mousemove.thumb', function(event) {
                          var offsetX = event.pageX - $seekBar.offset().left;
                          var barWidth = $seekBar.width();
                          var seekBarFillRatio = offsetX / barWidth;

                          updateSeekPercentage($seekBar, seekBarFillRatio);
                      });

                      // #10
                      $(document).bind('mouseup.thumb', function() {
                          $(document).unbind('mousemove.thumb');
                          $(document).unbind('mouseup.thumb');
                      });
                  });
              };

               songListContainer.addEventListener('mouseover', function(event) {
                   // #1

                   if (event.target.parentElement.className === 'album-view-song-item') {
                       event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
                   }
               });

              var albums = [albumPicasso, albumMarconi];
              var index = 0;
              $(".album-cover-art").on('click', function(event) {
                  setCurrentAlbum(albums[index]);
                  index++;
                  //console.log('Current Index' + index)
                  //console.log('Album Length:' + albums.length);
                  if (index == albums.length) {
                      index = 0;
                  }
              });
     console.log(currentlyPlayingSongNumber);
              console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

            var songNumber = parseInt($(this).attr('data-song-number'));
        }; 
     
     
     