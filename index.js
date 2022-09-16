// Base Js
const main = document.querySelector(".main"),
  listSongWrap = main.querySelector(".songs-list__songs"),
  songImg = main.querySelector(".disc-wrap img"),
  songName = main.querySelector(".disc-wrap__name"),
  songAuthor = main.querySelector(".disc-wrap__author"),
  mainAudio = main.querySelector("#main-audio"),
  playBtn = main.querySelector(".play"),
  pauseBtn = main.querySelector(".pause"),
  backBtn = main.querySelector(".back"),
  nextBtn = main.querySelector(".next"),
  progressArea = main.querySelector(".progress-area"),
  progressBar = main.querySelector(".progress-bar");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
// MAIN JS
// Render Number Of Songs
const headingArea = main.querySelector(".main-area__heading");
headingArea.innerHTML = `<h3>Most Popular</h3>
  <span>${allMusic.length} Songs (<a href="https://soundcloud.com">© SoundCloud</a>)</span>`;

// Render Music Into Web
function renderMusic() {
  const arrRender = [];
  for (var i = 0; i < allMusic.length; i++) {
    var htmls = `<div class="song">
                        <div class="song-info" div-index='${
                          i + 1
                        }' onclick='clicked__on(this)'>
                        <img src="/assets/image/song_img/${
                          allMusic[i].img
                        }.jpg" alt="${allMusic[i].img} img">
                        <span class="song-info__number">${i + 1}</span>
                        <span class="song-info__author">${
                          allMusic[i].author
                        }</span>
                        <span class="song-info__dash">-</span>
                        <span class="song-info__name">${allMusic[i].name}</span>
                        </div>
                        <i class="ri-heart-fill love"></i>
                    </div>`;
    arrRender.push(htmls);
  }
  listSongWrap.innerHTML = arrRender.join("");
}
renderMusic();
function loadMusic(indexNum) {
  songName.innerText = allMusic[indexNum - 1].name;
  songAuthor.innerText = allMusic[indexNum - 1].author;
  songImg.src = `/assets/image/song_img/${allMusic[indexNum - 1].img}.jpg`;
  songImg.alt = `${allMusic[indexNum - 1].src} img`;
  mainAudio.src = `/music_list/${allMusic[indexNum - 1].src}.mp3`;
}
loadMusic(musicIndex);
// CD Rotate
const cdAnimate = songImg.animate([{ transform: "rotate(360deg)" }], {
  duration: 10000,
  iterations: Infinity,
});
cdAnimate.pause();
// Love Loved
const love = document.querySelectorAll(".love");
love.forEach((abcd) => {
  abcd.addEventListener("click", () => {
    abcd.classList.toggle("active");
  });
});
// Play, Pause Music Function
function playMusic() {
  playBtn.classList.add("active");
  mainAudio.play();
  cdAnimate.play();
}
function pauseMusic() {
  playBtn.classList.remove("active");
  mainAudio.pause();
  cdAnimate.pause();
}
// Play, Pause Btn Event
playBtn.addEventListener("click", () => {
  const isMusicPause = playBtn.classList.contains("active");
  if (!isMusicPause) {
    playMusic();
  }
});
pauseBtn.addEventListener("click", () => {
  const isMusicPlay = playBtn.classList.contains("active");
  if (isMusicPlay) {
    pauseMusic();
  }
});
// Back, Next Music Function
function backMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}
function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : musicIndex;
  loadMusic(musicIndex);
  playMusic();
}
// Back, Next Btn Event
backBtn.addEventListener("click", () => {
  backMusic();
});
nextBtn.addEventListener("click", () => {
  nextMusic();
});
// Volume Bar
const volBtn = main.querySelector(".vol");
volBtn.addEventListener("click", function () {
  volBtn.classList.toggle("active");
});
// Progress Bar Update Time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime * 100) / duration;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = main.querySelector(".current"),
    musicDuration = main.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    // Duration Update
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  // Current Time Update
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Progress Bar Update Time When Click
progressArea.addEventListener("click", (e) => {
  let progressWidthValue = progressArea.clientWidth;
  let clickOffSetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickOffSetX * songDuration) / progressWidthValue;
  playMusic();
});
// Change Volume
function setVolume() {
  const volRange = main.querySelector(".volume-bar__range");
  mainAudio.volume = volRange.value / 100;
}

// Play Song When Click
function clicked__on(element) {
  let getDivIndex = element.getAttribute("div-index");
  musicIndex = getDivIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}
