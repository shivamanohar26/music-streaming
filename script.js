const albums = [
  {
    title: "They call him OG",
    cover: "images/movie1.jpg",
    songs: [
      { name: "Fire Storm", src: "songs/movie1-song1.mp3" },
      { name: "suvvi suvvi", src: "songs/movie1-song2.mp3" },
      { name: "trance of OMI", src: "songs/movie1-song3.mp3" },
    ]
  },
  {
    title: "Devara",
    cover: "images/movie2.jpg",
    songs: [
      { name: "Ayudha pooja", src: "songs/movie2-song1.mp3"},
      { name: "chuttamalle", src:  "songs/movie2-song2.mp3" },
      { name: "Fear", src:  "songs/movie2-song3.mp3" },
    ]
  },
  {
    title: "Dude",
    cover: "images/dude.jpeg",
    songs: [
      { name: "Nee Gundalo na", src: "songs/movie4.mp3"},
     
    ]
  },
   
  // Add 8 more movies similarly
  {
    title: "Beast",
    cover: "images/movie3.jpg",
    songs: [
      { name: "Arabic kuthu", src: "songs/movie3-song1.mp3"},
      { name: "Beast mode", src:  "songs/movie3-song2.mp3" },
      { name: "Jolly o Gymkhana",src:"songs/movie3-song3.mp3.mp3" },
    ]
  },
];


let currentAlbum = null;
let currentSongIndex = 0;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const audioPlayer = document.getElementById("audioPlayer");
const songSection = document.getElementById("songSection");
const albumSection = document.getElementById("albumSection");
const albumList = document.getElementById("albumList");
const favoritesList = document.getElementById("favoritesList");

function showAlbums() {
  albumSection.classList.remove("hidden");
  songSection.classList.add("hidden");
  albumList.innerHTML = "";
  albums.forEach((album, index) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
      <img src="${album.cover}" alt="${album.title}">
      <h3>${album.title}</h3>`;
    div.onclick = () => openAlbum(index);
    albumList.appendChild(div);
  });
}

function openAlbum(index) {
  currentAlbum = albums[index];
  albumSection.classList.add("hidden");
  songSection.classList.remove("hidden");
  document.getElementById("movieTitle").innerText = currentAlbum.title;
  document.getElementById("movieCover").src = currentAlbum.cover;
  loadSongList();
  playSong(0);
}

function loadSongList() {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";
  currentAlbum.songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("song-item");
    div.innerHTML = `${song.name}`;
    div.onclick = () => playSong(i);
    songList.appendChild(div);
  });
}

function playSong(index) {
  currentSongIndex = index;
  audioPlayer.src = currentAlbum.songs[index].src;
  audioPlayer.play();
}

function togglePlay() {
  if (audioPlayer.paused) audioPlayer.play();
  else audioPlayer.pause();
}

function prevSong() {
  if (currentSongIndex > 0) playSong(currentSongIndex - 1);
}

function nextSong() {
  if (currentSongIndex < currentAlbum.songs.length - 1)
    playSong(currentSongIndex + 1);
}

function toggleLike() {
  const currentSong = currentAlbum.songs[currentSongIndex];
  const exists = favorites.find(f => f.src === currentSong.src);
  if (!exists) {
    favorites.push(currentSong);
  } else {
    favorites = favorites.filter(f => f.src !== currentSong.src);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

function loadFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach(song => {
    const div = document.createElement("div");
    div.classList.add("song-item");
    div.innerText = song.name;
    div.onclick = () => {
      audioPlayer.src = song.src;
      audioPlayer.play();
    };
    favoritesList.appendChild(div);
  });
}

function backToAlbums() {
  showAlbums();
}

window.onload = () => {
  showAlbums();
  loadFavorites();
};
