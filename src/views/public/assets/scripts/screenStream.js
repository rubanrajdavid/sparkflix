var video = document.querySelector('.video');
var playButton = document.getElementById('play-pause');
var volumeMute = document.getElementById('volumeMute')
var volumeSlider = document.getElementById('volumeSlider')
var duration = document.getElementById("duration");
var videoSeeker = document.getElementById("videoSeeker");
var lightsOff = document.getElementById("lightsOff");
var sync = document.getElementById("sync");
video.muted = false

var socket = io();
socket.emit("joinRoom", screenID)
socket.on("greetMsg", msg => { console.log(msg) })
socket.on("newUserConnectMsg", msg => { console.log(msg) })
socket.on("userDisconnectMsg", msg => { console.log(msg) })
socket.on("controls", (data) => {
    console.log(data)
    if (data == "play") {
        playButton.className = "pause"
        video.play()
    }
    else if (data == "pause") {
        playButton.className = "play"
        video.pause()
    }
    else if (data == "-10s") {
        video.currentTime = video.currentTime - 10
    }
    else if (data == "+10s") {
        video.currentTime = video.currentTime + 10
    }
    else {
        video.currentTime = data
    }
})
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
        socket.emit("screenCom", { id: screenID, type: "play" })
        playButton.className = "pause"
        video.play()
    }
    else {
        socket.emit("screenCom", { id: screenID, type: "pause" })
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

function toggleLights() {
    var x = document.getElementsByTagName("BODY")[0];
    if (x.style.backgroundColor == "rgb(185, 227, 252)") {
        x.style.backgroundColor = "#000";
        console.log("cc")
    }
    else {
        console.log(x.style.backgroundColor)
        x.style.backgroundColor = "rgb(185, 227, 252)"
    }
}
sync.onclick = function () {
    socket.emit("screenCom", { id: screenID, type: video.currentTime })
}
volumeMute.onclick = function () {
    toggleVolume()
}

playButton.onclick = function () {
    togglePlayPause()
}

lightsOff.onclick = function () {
    toggleLights()
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
    socket.emit("screenCom", { id: screenID, type: "-10s" })
    video.currentTime = video.currentTime - 10
};
document.getElementById("+10s").onclick = function () {
    socket.emit("screenCom", { id: screenID, type: "+10s" })
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