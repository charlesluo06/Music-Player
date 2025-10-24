const playButton = document.getElementById("play");
const music = document.getElementById("song");
const pauseButton = document.getElementById("pause");
const audioSlider = document.getElementById("audioBar");


pauseButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playButton.textContent = "Play";
        pauseButton.style.opacity = '1';
        playButton.style.opacity = "0";
    }

    else {
        music.pause();
        playButton.textContent = "Pause";
        pauseButton.style.opacity = '0';
        playButton.style.opacity = "1";
    }
});

audioSlider.addEventListener("input", ()=> {
    music.volume = audioSlider.value/100;
});