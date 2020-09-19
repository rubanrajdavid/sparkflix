var video = document.querySelector('.video');
var playButton = document.getElementById('play-pause');
var volumeMute = document.getElementById('volumeMute')
var volumeSlider = document.getElementById('volumeSlider')
var duration = document.getElementById("duration");
var videoSeeker = document.getElementById("videoSeeker");
video.muted = false

function toHours(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return h + ":" + m + ":" + s
}

video.addEventListener('loadedmetadata', function () {
    document.getElementById('duration').innerHTML = toHours(video.currentTime) + "/" + toHours(video.duration)
});

function togglePlayPause() {
    if (video.paused) {
        playButton.className = "pause"
        video.play()
    }
    else {
        playButton.className = "play"
        video.pause()
    }
}



function toggleVolume() {
    if (video.muted) {
        volumeMute.className = "mute"
        video.muted = !video.muted
    }
    else {
        volumeMute.className = "unmute"
        video.muted = !video.muted
    }
}

volumeMute.onclick = function () {
    toggleVolume()
}

playButton.onclick = function () {
    togglePlayPause()
}

volumeSlider.oninput = function () {
    video.volume = volumeSlider.value / 100;
    if (volumeSlider.value == 0) {
        volumeMute.className = "unmute"
    }
    else {
        volumeMute.className = "mute"
    }
}
videoSeeker.oninput = function () {
    var seekerTo = (videoSeeker.value * video.duration) / 100
    video.currentTime = seekerTo
}

document.getElementById("-10s").onclick = function () {
    video.currentTime = video.currentTime - 10
};
document.getElementById("+10s").onclick = function () {
    video.currentTime = video.currentTime + 10
};
video.addEventListener('timeupdate', () => {
    var juicePos = video.currentTime / video.duration;
    videoSeeker.value = juicePos * 100;
    document.getElementById('duration').innerHTML = toHours(video.currentTime) + "/" + toHours(video.duration)
    if (video.ended) {
        playButton.className = "play"
    }
})