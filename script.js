//html elements
const movieListDiv = document.getElementById("movieList");
const form = document.getElementById("movieForm");
const saveBtn = document.getElementById("saveBtn");
const searchInput = document.getElementById("searchInput");

let editID = -1;
const favMovies = JSON.parse(localStorage.getItem("favorites")) || [];

//Initial Movies database
const movies = [
  {
    movieId: 1,
    title: "The Grand Escape",
    director: "Alex Reed",
    yearOfRelease: 2021,
    summary:
      "A thrilling adventure unfolds as friends discover an ancient map leading to forgotten treasures. Their journey turns into a daring escape from hidden dangers.",
    rating: 8.2,
    category: "Adventure",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 2,
    title: "Beyond the Horizon",
    director: "Samantha Miles",
    yearOfRelease: 2019,
    summary:
      "A captivating documentary that takes viewers on an unprecedented journey through Earth's remote environments, exploring their stunning beauty and complexity.",
    rating: 9.1,
    category: "Documentary",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 3,
    title: "Whispers in the Dark",
    director: "Ethan Hunt",
    yearOfRelease: 2020,
    summary:
      "In a quiet town, a detective finds himself in the midst of unexplained disappearances, uncovering buried secrets that unravel his perception of reality.",
    rating: 7.5,
    category: "Thriller",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 4,
    title: "Rise of the Forgotten",
    director: "Lucy Chang",
    yearOfRelease: 2018,
    summary:
      "An epic fantasy where heroes battle ancient evils to save their kingdom from a curse that erases people from memory, testing the bonds of friendship and courage.",
    rating: 8.7,
    category: "Fantasy",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 5,
    title: "The Last Light",
    director: "Mohammed Al Fayed",
    yearOfRelease: 2022,
    summary:
      "In a post-apocalyptic world, a band of survivors seeks the last city with power, facing challenges that test their humanity against the backdrop of despair.",
    rating: 8.3,
    category: "Sci-Fi",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 6,
    title: "Echoes of Time",
    director: "Clara Robertson",
    yearOfRelease: 2021,
    summary:
      "A time-traveler's quest to prevent a global catastrophe unfolds across different timelines, where each decision can save or doom the world.",
    rating: 9.0,
    category: "Science Fiction",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 7,
    title: "Underwater Realm",
    director: "Jake Simmons",
    yearOfRelease: 2017,
    summary:
      "A marine biologist discovers a hidden city beneath the ocean's surface, initiating a journey that reveals our deep connection to the sea and its mysteries.",
    rating: 8.5,
    category: "Adventure",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 8,
    title: "The Art of the Heist",
    director: "Sophia Loren",
    yearOfRelease: 2020,
    summary:
      "An elite team of thieves plans the ultimate art heist, challenging their skills against the most secure galleries in the world, leading to an unexpected twist.",
    rating: 7.8,
    category: "Crime",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 9,
    title: "Dawn of the Dragons",
    director: "Marcus Vinicius",
    yearOfRelease: 2019,
    summary:
      "In a realm where dragons rule the skies, a lone human befriends a dragon, changing the course of their worlds in a story of friendship, loyalty, and bravery.",
    rating: 8.9,
    category: "Fantasy",
    poster: "https://placehold.co/400",
  },
  {
    movieId: 10,
    title: "Silence of the Jungle",
    director: "Gabriela Cowperthwaite",
    yearOfRelease: 2021,
    summary:
      "A documentary that explores the untouched wilderness of the Amazon, highlighting the delicate balance of ecosystems and the looming threats they face.",
    rating: 9.4,
    category: "Documentary",
    poster: "https://placehold.co/400",
  },
];

// Function to generate a unique event ID
function generateMovieId() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

//fnc to hide modal
function hideModal() {
  const movieModal = document.getElementById("movieModal");
  const movieModalInstance = bootstrap.Modal.getInstance(movieModal);
  movieModalInstance.hide();
}

//fnc to show the modal
function showModal() {
  const movieModalElement = document.getElementById("movieModal");
  const movieModal = new bootstrap.Modal(movieModalElement);
  movieModal.show();
}

//add movie to the movie list
function addMovieToList() {
  const newMovie = {
    movieId: generateMovieId(),
    title: form.movieTitle.value.trim(),
    director: form.movieDirector.value.trim(),
    yearOfRelease: form.releaseYear.value.trim(),
    summary: form.movieSummary.value.trim(),
    rating: form.movieRating.value.trim(),
    category: form.movieCategory.value.trim(),
    poster: "https://placehold.co/400",
  };

  movies.push(newMovie);

  form.reset();
  hideModal();

  console.log(movies);
}

//display movie list
function displayMovieList(moviesArray) {
  movieListDiv.innerHTML = "";

  moviesArray.forEach((movie) => {
    renderCards(movie);
  });
}

//render cards
function renderCards(movie) {
  //col4
  const col4 = document.createElement("div");
  col4.classList.add("col-4");

  //card
  const card = document.createElement("div");
  card.classList.add("card");

  //img
  const img = document.createElement("img");
  img.src = movie.poster;
  img.classList.add("card-img-top");
  img.alt = movie.title;

  //card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  //h5
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = movie.title;

  //movie summary
  const movieSummery = document.createElement("p");
  movieSummery.classList.add("card-text");
  movieSummery.textContent = movie.summary;

  //div
  const div = document.createElement("div");

  //row
  const row = document.createElement("div");
  row.classList.add("row");

  //col-7
  const col7 = document.createElement("div");
  col7.classList.add("col-7");

  //fav btn
  const favoriteBtn = document.createElement("button");
  favoriteBtn.classList.add("btn", "btn-warning");
  favoriteBtn.id = "addToFavBtn";
  favoriteBtn.textContent = "Add to Favorites";

  favoriteBtn.addEventListener("click", () => {
    addToFav(movie);
  });

  //col-5
  const col5 = document.createElement("div");
  col5.classList.add("col-5");

  //edit btn
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-primary", "me-2");
  editBtn.id = "editBtn";
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () => {
    editBtnFunction(movie);
  });

  //delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.id = "deleteBtn";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    deleteMovie(movie, col4);
  });

  col7.append(favoriteBtn);
  col5.append(editBtn, deleteBtn);
  row.append(col7, col5);
  div.append(row);
  cardBody.append(title, movieSummery, div);
  card.append(img, cardBody);
  col4.append(card);
  movieListDiv.append(col4);
}

//edit btn function
function editBtnFunction(movie) {
  showModal();
  editID = movie.movieId;

  form.movieTitle.value = movie.title;
  form.movieDirector.value = movie.director;
  form.releaseYear.value = movie.yearOfRelease;
  form.movieSummary.value = movie.summary;
  form.movieRating.value = movie.rating;
  form.movieCategory.value = movie.category;
}

//delete movie fnc
function deleteMovie(movie, col4) {
  const alertDelete = confirm("Are you sure you want to delete this movie?");

  if (!alertDelete) return;

  const updatedMovies = movies.filter((m) => m.movieId !== movie.movieId);

  movies.length = 0;
  movies.push(...updatedMovies);

  console.log(movies);

  displayMovieList(movies);

  col4.remove();
}

//save btn fnc
function saveBtnFunction() {
  if (editID === -1) {
    addMovieToList();
  } else {
    const movieToUpdate = movies.find((m) => m.movieId === editID); // Find the movie by editID
    if (movieToUpdate) {
      movieToUpdate.title = form.movieTitle.value.trim();
      movieToUpdate.director = form.movieDirector.value.trim();
      movieToUpdate.yearOfRelease = form.releaseYear.value.trim();
      movieToUpdate.summary = form.movieSummary.value.trim();
      movieToUpdate.rating = form.movieRating.value.trim();
      movieToUpdate.category = form.movieCategory.value.trim();
      hideModal();
      console.log("Updated movie:", movieToUpdate);
      console.log(movies);
    }
    form.reset();
    editID = -1;
  }

  displayMovieList(movies);
}

//add to fav fnc
function addToFav(movie) {
  alert(`${movie.title} has been added to favorites!`);

  favMovies.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favMovies));
  console.log(favMovies);
}

//search filter function
function searchFilter() {
  const searchedValue = searchInput.value.toLowerCase().trim();
  console.log("Search Input:", searchedValue); // Debugging

  const searchedMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchedValue)
  );

  displayMovieList(searchedMovies);
}

//------SEARCH INPUT EVENT----------
searchInput.addEventListener("keyup", searchFilter);

//------SAVE BTN EVENT--------
saveBtn.addEventListener("click", () => {
  saveBtnFunction();
});

displayMovieList(movies);
