function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    listFiles();
}

var CLIENT_ID = '660276360583-8s7r9b170mlrhr93cnka2ea1e14nk3al.apps.googleusercontent.com';
var API_KEY = 'AIzaSyB23haIBOyfvbZgafkm4jNZMhql-Wr2-QE';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listFiles();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print filess.
 */
var songsList = [];

function listFiles() {
    gapi.client.drive.files.list({
        'pageSize': 100,
        'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
        appendPre('Files:');
        var files = response.result.files;
        var temp = [];
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filee = files[i];
                var regex = new RegExp("\\w*.mp3$");
                if (regex.test(filee.name)) {
                    temp.push(filee);
                }
            }
                for (var i = 0; i < temp.length; i++) {
                var file = temp[i];
                // var regex = new RegExp("\\w*.mp3$");
                // if (regex.test(file.name)) {
                    // appendPre(file.name + ' (' + file.id + ')');
                    const p = document.createElement("a");
                    p.href = 'https://docs.google.com/uc?export=download&id='+ file.id;
                    p.textContent = file.name;
                    document.querySelector('#content').appendChild(p);
                    var br = document.createElement("br");
                    document.querySelector('#content').appendChild(br);

                    const source = document.createElement("source");
                    source.src = 'https://docs.google.com/uc?export=download&id='+ file.id;
                    source.setAttribute('data-track-number', i+1);
                    // var test = document.getElementsByTagName("audio");
                    // test.appendChild(source);
                    document.querySelector('#audio').appendChild(source);


                    const playListRow = document.createElement("div");
                    playListRow.setAttribute('class', 'play-list-row');
                    playListRow.setAttribute('data-track-row', i+1);

                    // const smallToggleButton = document.createElement("div");
                    // smallToggleButton.setAttribute('class', 'small-toggle-btn');
                    //
                    // const smallPlayButton = document.createElement("i");
                    // smallPlayButton.setAttribute('class', 'small-play-btn');
                    //
                    // const screenReaderText = document.createElement("span");
                    // screenReaderText.setAttribute('class', 'screen-reader-text');
                    // screenReaderText.textContent = 'Small toggle button';
                    //
                    // const trackNumber = document.createElement("div");
                    // trackNumber.setAttribute('class', 'track-number');
                    // trackNumber.textContent = i+1+'.';
                    //
                    // const trackTitle = document.createElement("div");
                    // trackTitle.setAttribute('class', 'track-title');
                    //
                    // const playListTrack = document.createElement("a");
                    // playListTrack.setAttribute('class', 'playlist-track');
                    // playListTrack.href = '#';
                    // playListTrack.setAttribute('data-play-track', i.toString());
                    // playListTrack.textContent = file.name;

                // debugger;
                    document.querySelector('.play-list').appendChild(playListRow);



                    // document.querySelector('.play-list').appendChild(playListRow);
                    //
                    // document.querySelector('.play-list-row').appendChild(smallToggleButton);
                    //
                    // document.querySelector('.small-toggle-btn').appendChild(smallPlayButton);
                    // document.querySelector('.small-play-btn').appendChild(screenReaderText);
                    //
                    // document.querySelector('.play-list-row').appendChild(trackNumber);
                    // document.querySelector('.play-list-row').appendChild(trackTitle);
                    // document.querySelector('.track-title').appendChild(playListTrack);
                    songsList.push('https://docs.google.com/uc?export=download&id='+ file.id);


                // }
            }
            console.log(songsList);






            const smallToggleButton = document.createElement("div");
            smallToggleButton.setAttribute('class', 'small-toggle-btn');

            const smallPlayButton = document.createElement("i");
            smallPlayButton.setAttribute('class', 'small-play-btn');

            const screenReaderText = document.createElement("span");
            screenReaderText.setAttribute('class', 'screen-reader-text');
            screenReaderText.textContent = 'Small toggle button';

            const trackNumber = document.createElement("div");
            trackNumber.setAttribute('class', 'track-number');
// trackNumber.textContent = i+1+'.';

            const trackTitle = document.createElement("div");
            trackTitle.setAttribute('class', 'track-title');

// const playListTrack = document.createElement("a");
// playListTrack.setAttribute('class', 'playlist-track');
// playListTrack.href = '#';
// playListTrack.setAttribute('data-play-track', i.toString());
// playListTrack.textContent = file.name;


            // const parentObject = document.getElementsByClassName('play-list-row');

const parentObject = document.querySelectorAll('.play-list-row');

let nodeItem;
for (let i = 0; i < parentObject.length; i++) {
    nodeItem = parentObject.item(i);
    let number = i+1;
    nodeItem.innerHTML = `<div class="small-toggle-btn">
                <i class="small-play-btn">
                    <span class="screen-reader-text">Small toggle button</span>
                </i>
            </div>
            <div class="track-number">
                `+number+`.
            </div>
            <div class="track-title">
                <a class="playlist-track" href="#" data-play-track=`+number+`>`+temp[i].name+`</a>
            </div>`;
}



            // document.querySelector('.play-list-row').appendChild(smallToggleButton);
            //
            // document.querySelector('.small-toggle-btn').appendChild(smallPlayButton);
            // document.querySelector('.small-play-btn').appendChild(screenReaderText);
            //
            // document.querySelector('.play-list-row').appendChild(trackNumber);
            // document.querySelector('.play-list-row').appendChild(trackTitle);




//
// parentObject.forEach((parent, i) => {
//     const childElement1 = document.createElement('.small-toggle-btn');
//     const childElement2 = document.createElement('track-number');
//     const childElement3 = document.createElement('track-title');
//     childElement1.className = 'second';
//     childElement1.innerHTML = `second ${i}`;
//     parent.appendChild(childElement1);
//     parent.appendChild(childElement2);
//     parent.appendChild(childElement3)
// });












        } else {
            appendPre('No files found.');
        }
    });

}





var audioPlayer = function() {
    "use strict";

    // Private variables
    var _currentTrack = null;
    var _elements = {
        audio: document.getElementById("audio"),
        playerButtons: {
            largeToggleBtn: document.querySelector(".large-toggle-btn"),
            nextTrackBtn: document.querySelector(".next-track-btn"),
            previousTrackBtn: document.querySelector(".previous-track-btn"),
            smallToggleBtn: document.getElementsByClassName("small-toggle-btn")
        },
        progressBar: document.querySelector(".progress-box"),
        playListRows: document.getElementsByClassName("play-list-row"),
        trackInfoBox: document.querySelector(".track-info-box")
    };
    var _playAHead = false;
    var _progressCounter = 0;
    var _progressBarIndicator = _elements.progressBar.children[0].children[0].children[1];
    var _trackLoaded = false;

    /**
     * Determines the buffer progress.
     *
     * @param audio The audio element on the page.
     **/
    var _bufferProgress = function(audio) {
        var bufferedTime = (audio.buffered.end(0) * 100) / audio.duration;
        var progressBuffer = _elements.progressBar.children[0].children[0].children[0];

        progressBuffer.style.width = bufferedTime + "%";
    };

    /**
     * A utility function for getting the event cordinates based on browser type.
     *
     * @param e The JavaScript event.
     **/
    var _getXY = function(e) {
        var containerX = _elements.progressBar.offsetLeft;
        var containerY = _elements.progressBar.offsetTop;

        var coords = {
            x: null,
            y: null
        };

        var isTouchSuopported = "ontouchstart" in window;

        if (isTouchSuopported) { //For touch devices
            coords.x = e.clientX - containerX;
            coords.y = e.clientY - containerY;

            return coords;
        } else if (e.offsetX || e.offsetX === 0) { // For webkit browsers
            coords.x = e.offsetX;
            coords.y = e.offsetY;

            return coords;
        } else if (e.layerX || e.layerX === 0) { // For Mozilla firefox
            coords.x = e.layerX;
            coords.y = e.layerY;

            return coords;
        }
    };

    var _handleProgressIndicatorClick = function(e) {
        var progressBar = document.querySelector(".progress-box");
        var xCoords = _getXY(e).x;

        return (xCoords - progressBar.offsetLeft) / progressBar.children[0].offsetWidth;
    };

    /**
     * Initializes the html5 audio player and the playlist.
     *
     **/
    var initPlayer = function() {

        if (_currentTrack === 1 || _currentTrack === null) {
            _elements.playerButtons.previousTrackBtn.disabled = true;
        }

        //Adding event listeners to playlist clickable elements.
        for (var i = 0; i < _elements.playListRows.length; i++) {
            var smallToggleBtn = _elements.playerButtons.smallToggleBtn[i];
            var playListLink = _elements.playListRows[i].children[2].children[0];

            //Playlist link clicked.
            playListLink.addEventListener("click", function(e) {
                e.preventDefault();
                var selectedTrack = parseInt(this.parentNode.parentNode.getAttribute("data-track-row"));

                if (selectedTrack !== _currentTrack) {
                    _resetPlayStatus();
                    _currentTrack = null;
                    _trackLoaded = false;
                }

                if (_trackLoaded === false) {
                    _currentTrack = parseInt(selectedTrack);
                    _setTrack();
                } else {
                    _playBack(this);
                }
            }, false);

            //Small toggle button clicked.
            smallToggleBtn.addEventListener("click", function(e) {
                e.preventDefault();
                var selectedTrack = parseInt(this.parentNode.getAttribute("data-track-row"));

                if (selectedTrack !== _currentTrack) {
                    _resetPlayStatus();
                    _currentTrack = null;
                    _trackLoaded = false;
                }

                if (_trackLoaded === false) {
                    _currentTrack = parseInt(selectedTrack);
                    _setTrack();
                } else {
                    _playBack(this);
                }

            }, false);
        }

        //Audio time has changed so update it.
        _elements.audio.addEventListener("timeupdate", _trackTimeChanged, false);

        //Audio track has ended playing.
        _elements.audio.addEventListener("ended", function(e) {
            _trackHasEnded();
        }, false);

        //Audio error.
        _elements.audio.addEventListener("error", function(e) {
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    alert('You aborted the video playback.');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    alert('A network error caused the audio download to fail.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    alert('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    alert('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
                    break;
                default:
                    alert('An unknown error occurred.');
                    break;
            }
            _trackLoaded = false;
            _resetPlayStatus();
        }, false);

        //Large toggle button clicked.
        _elements.playerButtons.largeToggleBtn.addEventListener("click", function(e) {
            if (_trackLoaded === false) {
                _currentTrack = parseInt(1);
                _setTrack()
            } else {
                _playBack();
            }
        }, false);

        //Next track button clicked.
        _elements.playerButtons.nextTrackBtn.addEventListener("click", function(e) {
            if (this.disabled !== true) {
                _currentTrack++;
                _trackLoaded = false;
                _resetPlayStatus();
                _setTrack();
            }
        }, false);

        //Previous track button clicked.
        _elements.playerButtons.previousTrackBtn.addEventListener("click", function(e) {
            if (this.disabled !== true) {
                _currentTrack--;
                _trackLoaded = false;
                _resetPlayStatus();
                _setTrack();
            }
        }, false);

        //User is moving progress indicator.
        _progressBarIndicator.addEventListener("mousedown", _mouseDown, false);

        //User stops moving progress indicator.
        window.addEventListener("mouseup", _mouseUp, false);
    };

    /**
     * Handles the mousedown event by a user and determines if the mouse is being moved.
     *
     * @param e The event object.
     **/
    var _mouseDown = function(e) {
        window.addEventListener("mousemove", _moveProgressIndicator, true);
        audio.removeEventListener("timeupdate", _trackTimeChanged, false);

        _playAHead = true;
    };

    /**
     * Handles the mouseup event by a user.
     *
     * @param e The event object.
     **/
    var _mouseUp = function(e) {
        if (_playAHead === true) {
            var duration = parseFloat(audio.duration);
            var progressIndicatorClick = parseFloat(_handleProgressIndicatorClick(e));
            window.removeEventListener("mousemove", _moveProgressIndicator, true);

            audio.currentTime = duration * progressIndicatorClick;
            audio.addEventListener("timeupdate", _trackTimeChanged, false);
            _playAHead = false;
        }
    };

    /**
     * Moves the progress indicator to a new point in the audio.
     *
     * @param e The event object.
     **/
    var _moveProgressIndicator = function(e) {
        var newPosition = 0;
        var progressBarOffsetLeft = _elements.progressBar.offsetLeft;
        var progressBarWidth = 0;
        var progressBarIndicator = _elements.progressBar.children[0].children[0].children[1];
        var progressBarIndicatorWidth = _progressBarIndicator.offsetWidth;
        var xCoords = _getXY(e).x;

        progressBarWidth = _elements.progressBar.children[0].offsetWidth - progressBarIndicatorWidth;
        newPosition = xCoords - progressBarOffsetLeft;

        if ((newPosition >= 1) && (newPosition <= progressBarWidth)) {
            progressBarIndicator.style.left = newPosition + ".px";
        }
        if (newPosition < 0) {
            progressBarIndicator.style.left = "0";
        }
        if (newPosition > progressBarWidth) {
            progressBarIndicator.style.left = progressBarWidth + "px";
        }
    };

    /**
     * Controls playback of the audio element.
     *
     **/
    var _playBack = function() {
        if (_elements.audio.paused) {
            _elements.audio.play();
            _updatePlayStatus(true);
            document.title = "\u25B6 " + document.title;
        } else {
            _elements.audio.pause();
            _updatePlayStatus(false);
            document.title = document.title.substr(2);
        }
    };

    /**
     * Sets the track if it hasn't already been loaded yet.
     *
     **/
    var _setTrack = function() {
        var songURL = _elements.audio.children[_currentTrack - 1].src;

        _elements.audio.setAttribute("src", songURL);
        _elements.audio.load();

        _trackLoaded = true;

        _setTrackTitle(_currentTrack, _elements.playListRows);

        _setActiveItem(_currentTrack, _elements.playListRows);

        _elements.trackInfoBox.style.visibility = "visible";

        _playBack();
    };

    /**
     * Sets the activly playing item within the playlist.
     *
     * @param currentTrack The current track number being played.
     * @param playListRows The playlist object.
     **/
    var _setActiveItem = function(currentTrack, playListRows) {
        for (var i = 0; i < playListRows.length; i++) {
            playListRows[i].children[2].className = "track-title";
        }

        playListRows[currentTrack - 1].children[2].className = "track-title active-track";
    };

    /**
     * Sets the text for the currently playing song.
     *
     * @param currentTrack The current track number being played.
     * @param playListRows The playlist object.
     **/
    var _setTrackTitle = function(currentTrack, playListRows) {
        var trackTitleBox = document.querySelector(".player .info-box .track-info-box .track-title-text");
        var trackTitle = playListRows[currentTrack - 1].children[2].outerText;

        trackTitleBox.innerHTML = null;

        trackTitleBox.innerHTML = trackTitle;

        document.title = trackTitle;
    };

    /**
     * Plays the next track when a track has ended playing.
     *
     **/
    var _trackHasEnded = function() {
        parseInt(_currentTrack);
        _currentTrack = (_currentTrack === _elements.playListRows.length) ? 1 : _currentTrack + 1;
        _trackLoaded = false;

        _resetPlayStatus();

        _setTrack();
    };

    /**
     * Updates the time for the song being played.
     *
     **/
    var _trackTimeChanged = function() {
        var currentTimeBox = document.querySelector(".player .info-box .track-info-box .audio-time .current-time");
        var currentTime = audio.currentTime;
        var duration = audio.duration;
        var durationBox = document.querySelector(".player .info-box .track-info-box .audio-time .duration");
        var trackCurrentTime = _trackTime(currentTime);
        var trackDuration = _trackTime(duration);

        currentTimeBox.innerHTML = null;
        currentTimeBox.innerHTML = trackCurrentTime;

        durationBox.innerHTML = null;
        durationBox.innerHTML = trackDuration;

        _updateProgressIndicator(audio);
        _bufferProgress(audio);
    };

    /**
     * A utility function for converting a time in miliseconds to a readable time of minutes and seconds.
     *
     * @param seconds The time in seconds.
     *
     * @return time The time in minutes and/or seconds.
     **/
    var _trackTime = function(seconds) {
        var min = 0;
        var sec = Math.floor(seconds);
        var time = 0;

        min = Math.floor(sec / 60);

        min = min >= 10 ? min : '0' + min;

        sec = Math.floor(sec % 60);

        sec = sec >= 10 ? sec : '0' + sec;

        time = min + ':' + sec;

        return time;
    };

    /**
     * Updates both the large and small toggle buttons accordingly.
     *
     * @param audioPlaying A booean value indicating if audio is playing or paused.
     **/
    var _updatePlayStatus = function(audioPlaying) {
        if (audioPlaying) {
            _elements.playerButtons.largeToggleBtn.children[0].className = "large-pause-btn";

            _elements.playerButtons.smallToggleBtn[_currentTrack - 1].children[0].className = "small-pause-btn";
        } else {
            _elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";

            _elements.playerButtons.smallToggleBtn[_currentTrack - 1].children[0].className = "small-play-btn";
        }

        //Update next and previous buttons accordingly
        if (_currentTrack === 1) {
            _elements.playerButtons.previousTrackBtn.disabled = true;
            _elements.playerButtons.previousTrackBtn.className = "previous-track-btn disabled";
        } else if (_currentTrack > 1 && _currentTrack !== _elements.playListRows.length) {
            _elements.playerButtons.previousTrackBtn.disabled = false;
            _elements.playerButtons.previousTrackBtn.className = "previous-track-btn";
            _elements.playerButtons.nextTrackBtn.disabled = false;
            _elements.playerButtons.nextTrackBtn.className = "next-track-btn";
        } else if (_currentTrack === _elements.playListRows.length) {
            _elements.playerButtons.nextTrackBtn.disabled = true;
            _elements.playerButtons.nextTrackBtn.className = "next-track-btn disabled";
        }
    };

    /**
     * Updates the location of the progress indicator according to how much time left in audio.
     *
     **/
    var _updateProgressIndicator = function() {
        var currentTime = parseFloat(_elements.audio.currentTime);
        var duration = parseFloat(_elements.audio.duration);
        var indicatorLocation = 0;
        var progressBarWidth = parseFloat(_elements.progressBar.offsetWidth);
        var progressIndicatorWidth = parseFloat(_progressBarIndicator.offsetWidth);
        var progressBarIndicatorWidth = progressBarWidth - progressIndicatorWidth;

        indicatorLocation = progressBarIndicatorWidth * (currentTime / duration);

        _progressBarIndicator.style.left = indicatorLocation + "px";
    };

    /**
     * Resets all toggle buttons to be play buttons.
     *
     **/
    var _resetPlayStatus = function() {
        var smallToggleBtn = _elements.playerButtons.smallToggleBtn;

        _elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";

        for (var i = 0; i < smallToggleBtn.length; i++) {
            if (smallToggleBtn[i].children[0].className === "small-pause-btn") {
                smallToggleBtn[i].children[0].className = "small-play-btn";
            }
        }
    };

    return {
        initPlayer: initPlayer
    };
};

(function() {
    var player = new audioPlayer();

    player.initPlayer();
})();