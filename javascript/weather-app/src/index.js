import './styles.css';
import { fetchGif } from './apis/gifphy';
import { renderWeatherData } from './apis/visualCrossing';

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const dataContainer = document.querySelector(".data-container");

function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function showLoading() {
  loading.style.display = "flex";
  errorMessage.style.display = "none";
  dataContainer.innerHTML = "";
}

function hideLoading() {
  loading.style.display = "none";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  hideLoading();
}

async function createWeatherCard(day) {
  const gifUrl = await fetchGif(day.icon);
  const card = document.createElement("div");
  card.className = "card";

  const temperature = Math.round(day.temp);
  const conditions = day.conditions.charAt(0).toUpperCase() + day.conditions.slice(1);

  card.innerHTML = `
    <div class="card-header">
      <h2 class="date-display">${formatDate(day.date)}</h2>
      <img src="${gifUrl}" alt="${day.icon} weather" title="${conditions}">
    </div>
    <div class="card-body">
      <p><strong>Conditions:</strong> ${conditions}</p>
      <p><strong>Temperature:</strong> ${temperature}°F</p>
      <p><strong>Precipitation:</strong> ${day.precip}%</p>
      <p><strong>Humidity:</strong> ${day.humidity}%</p>
      <p><strong>Wind:</strong> ${day.wind} mph</p>
    </div>
  `;
  
  card.style.opacity = "0";
  dataContainer.appendChild(card);
  
  // Trigger reflow for animation to work
  void card.offsetWidth;
  
  // Fade in the card
  card.style.transition = "opacity 0.5s ease-in";
  card.style.opacity = "1";
}

async function handleSearch() {
  const location = searchInput.value.trim();

  if (!location) {
    showError("Please enter a location to search");
    return;
  }

  showLoading();

  try {
    const response = await renderWeatherData(location);
    hideLoading();

    if (response.errorCode) {
      showError(response.message || "Error fetching weather data");
      return;
    } else {
      for (let i = 0; i < response.length; i++) {
        if (i < 9) {
          setTimeout(() => {
            createWeatherCard(response[i]);
          }, i * 150)
        }
      }
    }
  } catch {
    hideLoading();
    showError("An error occurred while fetching weather data");
    console.error("Error fetching weather data:", error);
  }
}

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

searchButton.addEventListener('click', handleSearch);
