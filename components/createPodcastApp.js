import { createOpt } from "./createOption.js";
import "./PodcastPreview.js";
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
  // build one card per podcast
  podcasts.forEach((podcastData) => {
    // 1️⃣ use the factory to build a view-model
    const pod = makePodcast(podcastData, genres, seasons);

    // 2️⃣ create the custom element
    const card = document.createElement("podcast-preview");

    // 3️⃣ feed custom element data from the factory result
    card.setAttribute("title", pod.title);
    card.setAttribute("cover", pod.image);
    card.setAttribute("seasons", pod.seasons);
    card.setAttribute("updated", pod.formattedUpdatedAt());
    // card.genres = pod.genreNames();

    // Attach event listener to open modal
    card.addEventListener("click", () => {
      renderModal(pod, modalContainer);
    });
    // Add to grid
    podGrid.appendChild(card);
  });

  return {
    init() {
      console.log("🎧 Podcast app initialized successfully!");
    },
  };
}
