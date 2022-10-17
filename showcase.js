const showcase = document.querySelector(".showcase-list");

// Gets the popular movies for the showcase section
function getShowcase(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showShowcase(data.results);
    });
}

getShowcase(API_URL);


// Displays the popular movies in the showcase section
function showShowcase(data) {
  showcase.innerHTML = "";

  data.forEach((movie) => {
    const { backdrop_path } = movie;
    const showcaseEl = document.createElement("li");
    showcaseEl.classList += "item-a";

    showcaseEl.innerHTML = `<div class="showcase__box">
    <img src="${IMG_URL + backdrop_path}" />
  </div>`;

    showcase.appendChild(showcaseEl);
  });
}
