const API_KEY = "api_key=b529828c9793a80f4ca8dc699eaf9dfc";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + "discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const LATEST_URL =
  BASE_URL +
  "discover/movie?primary_release_date.gte=2022-09-15&primary_release_date.lte=2022-10-13&" +
  API_KEY;
const SEARCH_URL = BASE_URL + "search/movie?" + API_KEY;
const TV_URL =
  "https://api.themoviedb.org/3/discover/tv?" +
  API_KEY +
  "&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0";

const latest = document.getElementById("latest");
const form = document.getElementById("form");
const search = document.getElementById("search");
const watchlist = document.getElementById("watchlist");
const watchlistArr = [];


// Gets the latest movies from TMDB API
function getLatestMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showLatestMovies(data.results);
    });
}

getLatestMovies(LATEST_URL);

// Displays the latest movies onto the website
function showLatestMovies(data) {
  latest.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList += "movie";

    if (poster_path) {
      movieEl.innerHTML = `<img
    src="${IMG_URL + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    <button class="btn" onclick="addToWatchlist(${id})">Add to Watchlist</button>
    ${overview}
  </div>`;
    } else {
      movieEl.innerHTML = `<figure class="icon"> <img
      src="./assets/no-image-icon.png"
      alt="${title}"
    />
    </figure>
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>`;
    }

    latest.appendChild(movieEl);
  });
}

// Adds movies to watch list section if you click on the button
function addToWatchlist(id) {
  const movieById =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?" +
    API_KEY +
    "&language=en-US";
    const but = document.querySelector('button');
      but.classList.remove('.btn');
      but.classList.add('.btn-done')
  fetch(movieById)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.title);

      watchlistArr.push(data);
      console.log(watchlistArr)
      showWatchlist(data);

      var json_str = JSON.stringify(watchlistArr);
    });
}

// Displays the watch list in the watch list section
function showWatchlist(data) {
  const { title, poster_path, vote_average, overview } = data;
  const movieEl = document.createElement("div");
  movieEl.classList += "movie";

  if (poster_path) {
    movieEl.innerHTML = `<img
    src="${IMG_URL + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>`;
  } else {
    movieEl.innerHTML = `<figure class="icon"> <img
      src="./assets/no-image-icon.png"
      alt="${title}"
    />
    </figure>
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>`;
  }

  watchlist.appendChild(movieEl);
}

// Gets the color of the movie rating
function getColor(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


// Searches for movies
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getLatestMovies(SEARCH_URL + "&query=" + searchTerm);
  } else {
    getLatestMovies(API_URL);
  }
});
