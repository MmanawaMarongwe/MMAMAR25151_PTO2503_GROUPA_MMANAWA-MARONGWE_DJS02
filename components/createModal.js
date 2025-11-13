/**
 * Build a podcast details modal element.
 *
 * Creates a `<div class="modal">` with cover, description, genre tags, and a seasons list.
 *
 * @param {Object} params
 * @param {string} params.name - Podcast title.
 * @param {string} params.cover - Cover image URL.
 * @param {string} params.description - Short description text.
 * @param {string[]} [params.genreTags=[]] - Genre labels to render as tags.
 * @param {string} params.lastUpdate - Human-readable last updated text (e.g., "2 weeks ago").
 * @param {{title?: string, episodes?: number}[]} [params.seasonsInfo=[]] - Seasons to display.
 * @returns {HTMLDivElement} The constructed modal element (not yet attached to the DOM).
 */

export function createModal({
  name,
  cover,
  description,
  genreTags = [],
  lastUpdate,
  seasonsInfo = [],
}) {
  const modal = document.createElement("div");
  modal.className = "modal";
  const seasonsHTML = seasonsInfo
    .map(({ title, episodes }, i) => {
      const sTitle = title || `Season ${i + 1}`;
      const ep = Number(episodes) ?? 0;
      return `
        <div class="season">
          <div class="season-row">
            <strong class="season-title">${sTitle}</strong>
            <span class="text-muted episodes-count">${ep} episode${
        ep === 1 ? "" : "s"
      }</span>
          </div>
        </div>
      `;
    })
    .join("");

  modal.innerHTML = `<span class="modal-close">&times;</span><h2>${name}</h2>
  <div>
    <div class = "podcast-info">
        <div class = "image-grid">
          <img src="${cover}" alt="${name} cover" class="modal-image" />
        </div>
        <div class="info-grid"> 
            <h3>Description</h3>
            <p class="text-muted">${description}</p>
            <h3>Genres</h3>
            <div class="genre-tags">
                ${genreTags
                  .map((genre) => `<span class="tag">${genre}</span>`)
                  .join("")}
            </div>
            <p class="text-muted">Last updated ${lastUpdate}</p>
        </div>
    </div>
        <div >
            <h2>Seasons</h2>
            <div>
              ${seasonsHTML}
            </div>
        </div>
        
  </div> 
       
    `;

  return modal;
}
/*  */
