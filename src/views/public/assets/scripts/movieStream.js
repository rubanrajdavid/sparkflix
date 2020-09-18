var video = document.querySelector('.video');
var juice = document.querySelector('.juice');
var playButton = document.getElementById('play-pause');
var volumeMute = document.getElementById('volumeMute')
var volumeSlider = document.getElementById('volumeSlider')
var duration = document.getElementById("duration");

function toHours(min) {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return hours.toPrecision(1) + ":" + minutes.toPrecision(1);
}

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
}

video.addEventListener('timeupdate', () => {
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";
    document.getElementById('duration').innerHTML = toHours(video.currentTime) + "/" + toHours(video.duration)
    if (video.ended) {
        playButton.className = "play"
    }
})