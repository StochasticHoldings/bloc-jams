var setSong = function(songNumber){
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber -1];
};

var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="'+ number + ' "]')
}

var createSongRow = function(songNumber, songName, songLength) {
     var template =
         '<tr class="album-view-song-item"><td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td><td class="song-item-title">' + songName + '</td><td class="song-item-duration">' + songLength + '</td></tr>'
     var $row = $(template);
     var clickHandler = function() {
         var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSongNumber !== null) {
             // Revert to song number for currently playing song because user started playing new song.
              var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
             currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }
           if (currentlyPlayingSongNumber !== songNumber) {
             // Switch from Play -> Pause button to indicate new song is playing.
             $(this).html(pauseButtonTemplate);
               setSong(songNumber);
               currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                updatePlayerBarSong();
            
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

         if (songNumber !== currentlyPlayingSong) {
             songNumberCell.html(songNumber);
         }
     };

     $row.find('.song-item-number').click(clickHandler);
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
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
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
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
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

                 for (var i = 0; i < songRows.length; i++) {
                     console.log('registering event for', i)
                     songRows[i].addEventListener('mouseleave', function(event) {
                         var songItem = getSongItem(event.target);
                         console.log('mouse left from', i)
                         var songItemNumber = songItem.getAttribute('data-song-number');

                         // #2
                         if (songItemNumber !== currentlyPlayingSong) {
                             songItem.innerHTML = songItemNumber;
                         }
                     });

                 }, 0);
         }


         // Album button templates
         var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
         var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
         var playerBarPlayButton = '<span class="ion-play"></span>';
         var playerBarPauseButton = '<span class="ion-pause"></span>';

         // Store state of playing songs
         var currentAlbum = null;
         var currentlyPlayingSongNumber = null;
         var currentSongFromAlbum = null;
                    
         var $previousButton = $('.main-controls .previous');
         var $nextButton = $('.main-controls .next');

         $(document).ready(function() {
             setCurrentAlbum(albumPicasso);
             $previousButton.click(previousSong);
             $nextButton.click(nextSong);
             for (var i = 0; i < songRows.length; i++) {
                 songRows[i].addEventListener('click', function(event) {
                     clickHandler(event.target);
                 });
             }
         });


         songListContainer.addEventListener('mouseover', function(event) {
             // #1

             if (event.target.parentElement.className === 'album-view-song-item') {
                 event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             }
         });

         var albums = [albumPicasso, albumMarconi, albumFishing];
         var index = 0;
         albumImage.addEventListener('click', function(event) {
             setCurrentAlbum(albums[index]);
             index++;
             //console.log('Current Index' + index)
             //console.log('Album Length:' + albums.length);
             if (index == albums.length) {
                 index = 0;
             }
         });
console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

var songNumber = parseInt($(this).attr('data-song-number'));