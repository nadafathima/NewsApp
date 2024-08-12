// API Used: http://newsapi.org/s/india-news-api

const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

// Create cards from data
const fallbackImages = [
  "./images/news1.webp",
  "./images/news2.webp",
  "./images/news3.jfif",
  "./images/news4.avif",
  "./images/news5.avif",
  "./images/news6.webp",
  "./images/news7.avif",
  "./images/news8.webp",
  "./images/news9.avif",
  "./images/news10.webp",
  "./images/news11.webp",
  "./images/news12.avif",
  "./images/news13.webp",
  "./images/news14.webp",
  "./images/news15.jpeg",
  "./images/news16.webp",
  "./images/news17.webp",
  "./images/news18.webp",
  "./newspaper.jpg",
  "./images/news20.webp"

];

const getRandomFallbackImage = () => {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

const generateUI = (articles) => {
  container.innerHTML = ""; // Clear previous content
  articles.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.urlToImage || getRandomFallbackImage()}" alt="News Image" />
      </div>
      <div class="news-content">
        <div class="news-title">${item.title}</div>
        <div class="news-description">${item.description || item.content || ""}</div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  });
};

// News API Call
const showLoadingIndicator = () => {
  container.innerHTML = `
    <div class="spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
};

const getNews = async () => {
  showLoadingIndicator(); // Show spinner while loading
  try {
    let response = await fetch(requestURL);
    if (!response.ok) throw new Error("Data unavailable");
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    container.innerHTML = `<p class="error-message">${error.message}. Please try again later.</p>`;
  }
};

// Category Selection
const selectCategory = (e, category) => {
  document.querySelectorAll(".option").forEach(element => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// Options Buttons
const createOptions = () => {
  options.forEach(option => {
    optionsContainer.innerHTML += `
      <button class="option ${option === "general" ? "active" : ""}" onclick="selectCategory(event, '${option}')">
        ${option}
      </button>`;
  });
};

const init = () => {
  createOptions();
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  getNews();
};

window.onload = init;
