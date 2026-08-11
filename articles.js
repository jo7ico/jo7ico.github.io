let articlesPerBatch = 8;
let currentBatch = 1;

function filterArticles() {
  const input = document.getElementById("search-input");
  const viewMoreBtn = document.getElementById("view-more-btn");
  const cards = document.querySelectorAll(".news-card");

  if (!input) return;

  const term = input.value.trim().toLowerCase();
  currentBatch = 1;

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    const tag = (card.dataset.tag || "").toLowerCase();
    const isMatch = !term || title.includes(term) || tag.includes(term);

    card.style.display = isMatch ? "block" : "none";
  });

  if (viewMoreBtn) {
    viewMoreBtn.style.display = term ? "none" : "block";
  }

  updateVisibleArticles();
}

function sortArticles() {
  const grid = document.getElementById("news-grid");
  if (!grid) return;

  const cards = Array.from(grid.children);
  cards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
  cards.forEach((card) => grid.appendChild(card));
}

function updateVisibleArticles() {
  const cards = document.querySelectorAll(".news-card");
  const viewMoreBtn = document.getElementById("view-more-btn");

  const maxVisible = currentBatch * articlesPerBatch;
  cards.forEach((card, index) => {
    card.style.display = index < maxVisible ? "block" : "none";
  });

  if (viewMoreBtn) {
    viewMoreBtn.style.display = maxVisible >= cards.length ? "none" : "block";
  }
}

function showMoreArticles() {
  currentBatch += 1;
  updateVisibleArticles();
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  if (input) {
    input.addEventListener("input", filterArticles);
    input.addEventListener("keyup", filterArticles);
  }

  sortArticles();
  updateVisibleArticles();
});

window.filterArticles = filterArticles;
window.showMoreArticles = showMoreArticles;
