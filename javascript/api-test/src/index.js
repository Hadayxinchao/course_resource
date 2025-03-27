import './styles.css';

const img = document.getElementById("gif-image");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const refreshButton = document.getElementById("refresh-button");
const errorMessage = document.getElementById("error-message");
const loading = document.getElementById("loading");

const API_KEY = "zyffszmH4fQBfWQYZysJ8Ino13cub1YO";

const DEFAULT_SEARCH = "cats";

const DEFAULT_IMAGE =
  "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif";

function fetchGif(searchTerm) {
  loading.style.display = "block";

  errorMessage.style.display = "none";

  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${searchTerm}`,
    { mode: "cors" }
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      loading.style.display = "none";

      if (
        response.data &&
        response.data.images &&
        response.data.images.original
      ) {
        img.src = response.data.images.original.url;
      } else {
        errorMessage.style.display = "block";
        img.src = DEFAULT_IMAGE;
      }
    })
    .catch(function (error) {
      loading.style.display = "none";

      errorMessage.style.display = "block";
      console.error("Error fetching GIF:", error);
      img.src = DEFAULT_IMAGE;
    });
}

searchButton.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (query) {
    fetchGif(query);
  } else {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Please enter a search term";
  }
});

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

refreshButton.addEventListener("click", function () {
  searchInput.value = "";
  fetchGif(DEFAULT_SEARCH);
});

fetchGif(DEFAULT_SEARCH);
