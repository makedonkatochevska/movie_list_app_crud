const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
const favoriteMovieDiv = document.getElementById("favoriteMovieList");
console.log(favoriteMovies);

//fnc to display fav movies
function displayFavoriteMovies() {
  favoriteMovieDiv.innerHTML = "";

  favoriteMovies.forEach((favMovie) => {
    renderFavoriteCards(favMovie);
  });
}

//fnc to render favorite movies
function renderFavoriteCards(favMovie) {
  //col4
  const col4 = document.createElement("div");
  col4.classList.add("col-4");

  //card
  const card = document.createElement("div");
  card.classList.add("card");

  //img
  const img = document.createElement("img");
  img.src = favMovie.poster;
  img.classList.add("card-img-top");
  img.alt = favMovie.title;

  //card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  //h5
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = favMovie.title;

  //movie summary
  const movieSummery = document.createElement("p");
  movieSummery.classList.add("card-text");
  movieSummery.textContent = favMovie.summary;

  //delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.id = "removeFromFavBtn";
  deleteBtn.textContent = "Remove from Favorites";

  deleteBtn.addEventListener("click", () => {
    deleteFavoriteMovie(favMovie, col4);
  });

  cardBody.append(title, movieSummery, deleteBtn);
  card.append(img, cardBody);
  col4.append(card);
  favoriteMovieDiv.append(col4);
}

//delete btn fnc
function deleteFavoriteMovie(favMovie, col4) {
  col4.remove();

  const updatedMovies = favoriteMovies.filter(
    (movie) => movie.movieId !== favMovie.movieId
  );

  favoriteMovies.length = 0;
  favoriteMovies.push(...updatedMovies);

  localStorage.setItem("favorites", JSON.stringify(favoriteMovies));

  console.log(updatedMovies);
}

displayFavoriteMovies();
