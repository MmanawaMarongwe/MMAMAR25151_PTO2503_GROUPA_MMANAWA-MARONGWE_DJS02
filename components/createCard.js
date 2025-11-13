/**
 *
 * @param {Object} param0 - Podcast data.
 * @param {string} param0.cover - Image URL for the podcast cover.
 * @param {string} param0.name - Podcast title to display.
 * @param {number} param0.seasons - Total number of seasons.
 * @param {string[]} [param0.genreTags=[]] - Genre labels (each becomes a <span>).
 * @param {string} param0.lastUpdate - Human-readable last updated text (e.g., "2 weeks ago").
 * @returns {HTMLDivElement} - The root <div class="card"> element, the podcast card
 *
 */
export function createCard({
  cover,
  name,
  seasons,
  genreTags = [],
  lastUpdate,
}) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img class="cover" src="${cover}" alt="${name}">
    <h4>${name}</h4>
    <p class="seasons-text">♡ ${seasons} seasons</p>
    <div class="genre-tags">
      ${genreTags.map((genre) => `<span class="tag">${genre}</span>`).join("")}
    </div>
    <p class="text-muted">Updated ${lastUpdate}</p>
  `;
  return card;
}
