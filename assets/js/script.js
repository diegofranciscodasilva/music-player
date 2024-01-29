const image = document.getElementById('cover')
const title = document.getElementById('music-title')
const artist = document.getElementById('music-artist')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const playerProgress = document.getElementById('player-progress')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const playBtn = document.getElementById('play')
const background = document.getElementById('bg-img')

const music = new Audio()

const songs = [
    {
        path: 'assets/musics/music1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/images/image1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/musics/music2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/images/image2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/musics/music3.mp3',
        displayName: 'Intellect',
        cover: 'assets/images/image3.jpg',
        artist: 'Yung Logos',
    }
]

let musicIndex = 0
let isPlaying = false

function togglePlay() {
    if (isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
}

function playMusic() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

function pauseMusic() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

function loadMusic(song) {
    music.src = song.path
    title.textContent = song.displayName
    artist.textContent = song.artist
    image.src = song.cover
    background.src = song.cover

    music.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(music.duration)
    })
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length
    loadMusic(songs[musicIndex])
    playMusic()
}

function updateProgressBar() {
    const { duration, currentTime } = music
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    currentTimeEl.textContent = formatTime(currentTime)
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth
    const clickX = e.offsetX
    music.currentTime = (clickX / width) * music.duration
}

function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

playBtn.addEventListener('click', togglePlay)
prevBtn.addEventListener('click', () => changeMusic(-1))
nextBtn.addEventListener('click', () => changeMusic(1))
music.addEventListener('ended', () => changeMusic(1))
music.addEventListener('timeupdate', updateProgressBar)
playerProgress.addEventListener('click', setProgressBar)

loadMusic(songs[musicIndex])