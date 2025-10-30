const playButton = document.getElementById("play");
const music = document.getElementById("song");
const pauseButton = document.getElementById("pause");
const audioSlider = document.getElementById("audioBar");
const rewindButton = document.getElementById("rewind");
const nextButton = document.getElementById("next");
const durationBar = document.getElementById("durationBar");
const volumeIcon = document.getElementById("volumeIcon");
const songTitle = document.getElementById("songTitle");
const playerBackground = document.getElementById("playerBackground");
const songCover = document.getElementById("coverImg");
const artist = document.getElementById("artist");
const body = document.body;
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");


// LOAD INITIAL GRADIENT
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(songCover, 3);
    const color = colorThief.getColor(songCover);

    const gradient = `linear-gradient(135deg, 
    rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}),
    rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}),
    rgb(${palette[2][0]}, ${palette[2][1]}, ${palette[2][2]})
    )`;

    body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    playerBackground.style.background = gradient;
    


const songs = [ // playlist array
    {
        title: "Love Yourself",
        artist: "Justin Bieber",
        src: "loveyourself.mp3",
        cover: "loveImg.jpg"
    },
    {
        title: "Always",
        artist: "Daniel Caesar",
        src: "Always.mp3",
        cover: "always.jpg"
    },
    {
        title: "Say You Won't Let Go",
        artist: "James Arthur",
        src: "sayYou.mp3",
        cover: "say.jpg"
    }
];


const playlistSize = songs.length;
let currentSongIndex = 0;

music.volume = .25;

window.addEventListener("DOMContentLoaded", () => {
    music.load(); // forces metadata to load
});


function formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs< 10 ? "0" + secs : secs}`;
}

music.addEventListener("loadedmetadata", () => {
    if (isNaN(music.duration)) return;
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
    else {
        currentSongIndex--;
        music.src = songs[currentSongIndex].src;
        songTitle.textContent = songs[currentSongIndex].title;
        coverImg.src = songs[currentSongIndex].cover;
        artist.textContent = songs[currentSongIndex].artist;
        if (music.paused) {
                music.play();
                pauseButton.style.opacity = '1';
                playButton.style.opacity = "0";
            }
        }
});

durationBar.addEventListener("input", () => {
    music.currentTime = (durationBar.value / 100) * music.duration;
});

music.addEventListener("timeupdate", () => {
    durationBar.value = (music.currentTime / music.duration) * 100;
    currentTime.textContent = formatTime(music.currentTime)
});

document.addEventListener("keydown", (e) => {   // space bar functionality

    if (e.key === " "){
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
    }
});

nextButton.addEventListener("click", () => {
    currentSongIndex++;

    if (currentSongIndex >= playlistSize){
        currentSongIndex = 0;
    }

    music.src = songs[currentSongIndex].src;
    songTitle.textContent = songs[currentSongIndex].title;
    coverImg.src = songs[currentSongIndex].cover;
    artist.textContent = songs[currentSongIndex].artist;
    if (music.paused) {
            music.play();
            pauseButton.style.opacity = '1';
            playButton.style.opacity = "0";
    }
});

music.addEventListener("timeupdate", () => {
    if (durationBar.value == 100){
        currentSongIndex++;
        music.src = songs[currentSongIndex].src;
        songTitle.textContent = songs[currentSongIndex].title;
        coverImg.src = songs[currentSongIndex].cover;
        artist.textContent = songs[currentSongIndex].artist;
        if (music.paused) {
                music.play();
                pauseButton.style.opacity = '1';
                playButton.style.opacity = "0";
        }
    }
});

songCover.addEventListener("load", () => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(songCover, 3);
    const color = colorThief.getColor(songCover);

    const gradient = `linear-gradient(135deg, 
    rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}),
    rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}),
    rgb(${palette[2][0]}, ${palette[2][1]}, ${palette[2][2]})
    )`;

    body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    playerBackground.style.background = gradient;
});