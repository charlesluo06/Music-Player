const playButton = document.getElementById("play");
const music = document.getElementById("song");
const pauseButton = document.getElementById("pause");
const audioSlider = document.getElementById("audioBar");
const rewindButton = document.getElementById("rewind");
const nextButton = document.getElementById("next");
const durationBar = document.getElementById("durationBar");
const volumeIcon = document.getElementById("volumeIcon");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");

music.volume = .25;

function formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs< 10 ? "0" + secs : secs}`;
}

music.addEventListener("loadedmetadata", () => {
    totalTime.textContent = formatTime(music.duration);
    durationBar.value = 0;
});

pauseButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        pauseButton.style.opacity = '1';
        playButton.style.opacity = "0";
    }

    else {
        music.pause();
        pauseButton.style.opacity = '0';
        playButton.style.opacity = "1";
    }
});

audioSlider.addEventListener("input", ()=> {
    music.volume = audioSlider.value/100;
});

muteIcon.addEventListener("click", () => {
    if (music.muted === true) {
        music.muted = false;
        muteIcon.style.opacity = '0';
        volumeIcon.style.opacity = "1";
    }

    else {
        music.muted = true;
        muteIcon.style.opacity = '1';
        volumeIcon.style.opacity = "0";
    }
})

rewindButton.addEventListener("click", () => {  // Add the previous song feature later :))
    if (music.currentTime >= 2){
        music.currentTime = 0;
    }
});

durationBar.addEventListener("input", () => {
    music.currentTime = (durationBar.value / 100) * music.duration;
});

music.addEventListener("timeupdate", () => {
    durationBar.value = (music.currentTime / music.duration) * 100;
    currentTime.textContent = formatTime(music.currentTime)
});