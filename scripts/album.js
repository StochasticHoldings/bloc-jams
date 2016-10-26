 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [{
         title: 'Blue',
         duration: '4:26'
     }, {
         title: 'Green',
         duration: '3:14'
     }, {
         title: 'Red',
         duration: '5:01'
     }, {
         title: 'Pink',
         duration: '3:21'
     }, {
         title: 'Magenta',
         duration: '2:15'
     }]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [{
         title: 'Hello, Operator?',
         duration: '1:01'
     }, {
         title: 'Ring, ring, ring',
         duration: '5:01'
     }, {
         title: 'Fits in your pocket',
         duration: '3:21'
     }, {
         title: 'Can you hear me now?',
         duration: '3:14'
     }, {
         title: 'Wrong phone number',
         duration: '2:15'
     }]
 };


 // Yet another albumm
 var albumFishing = {
     title: 'Fishing',
     artist: 'Snook',
     label: 'EM-Jigs',
     year: '2016',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [{
         title: 'Big Snook',
         duration: '1:01'
     }, {
         title: 'Glades',
         duration: '5:01'
     }, {
         title: 'Poling',
         duration: '3:21'
     }, ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item"><td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td><td class="song-item-title">' + songName + '</td><td class="song-item-duration">' + songLength + '</td></tr>'
     return template;
     
 };
 albumImage = null;
 albumArtist = null;
 albumTitle = null;
 albumReleaseInfo = null;
 albumSongList = null;

 var setCurrentAlbum = function(album) {
     // #1
     albumTitle = document.getElementsByClassName('album-view-title')[0];
     albumArtist = document.getElementsByClassName('album-view-artist')[0];
     albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     albumImage = document.getElementsByClassName('album-cover-art')[0];
     albumSongList = document.getElementsByClassName('album-view-song-list')[0];

     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);

     // #3
     albumSongList.innerHTML = '';

     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        
     }
 };

 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');
 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function(event) {
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
         }
     });

     songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
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

 };