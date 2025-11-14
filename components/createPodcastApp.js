import { createOpt } from "./createOption.js";
import { createCard } from "./createCard.js";
import { makePodcast } from "../utilities/podcastModel.js";
import { renderModal } from "./renderModal.js";

/**
 * Sets up the podcast UI on the page.
 * - Fills the genre dropdown with options
 * - Builds one card per podcast and appends to the grid
 * - Add event listener to each card to open a modal with details on click
 *
 * @param {Object} podcastObj
 * @param {{id:string,title:string}[]} podcastObj.genres - list of genre objects (id, title)
 * @param {Object[]} podcastObj.podcasts - raw podcast data from your data file
 * @param {Object[]} podcastObj.seasons - season data used by makePodcast to compute helpers
 * @param {{gDropdown:HTMLSelectElement,podGrid:HTMLElement,modalContainer:HTMLElement}} podcastObj.elements
 * @returns {{init:() => void}}
 */
export function createPodcastApp({ genres, podcasts, seasons, elements }) {
  const { gDropdown, podGrid, modalContainer } = elements;

  // Populate genre dropdown
  genres.forEach((genre) => {
    createOpt(gDropdown, genre.title);
  });

  // Render each podcast
  podcasts.forEach((podcast) => {
    const pod = makePodcast(podcast, genres, seasons);

    const podcastCard = createCard({
      cover: pod.image,
      name: pod.title,
      seasons: pod.seasons,
      genreTags: pod.genreNames(),
      lastUpdate: pod.formattedUpdatedAt(),
    });

    // Attach event listener to open modal
    podcastCard.addEventListener("click", () => {
      renderModal(pod, modalContainer);
    });
    // Add to grid
    podGrid.appendChild(podcastCard);
  });

  return {
    init() {
      console.log("🎧 Podcast app initialized successfully!");
    },
  };
}
