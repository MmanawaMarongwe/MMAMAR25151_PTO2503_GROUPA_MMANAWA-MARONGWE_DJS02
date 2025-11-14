import { genres, podcasts, seasons } from "./data.js";
import { createPodcastApp } from "./components/createPodcastApp.js";
// main.js
import "./components/podcastPreview.js"; // <-- add this line
const gDropdown = document.getElementById("genre-options");
const podGrid = document.getElementById("pod-grid");
const modalContainer = document.getElementById("modal-overlay");

const podcastApp = createPodcastApp({
  genres,
  podcasts,
  seasons,
  elements: { gDropdown, podGrid, modalContainer },
});

//Test the custom element that was created
const testPodcast = podcasts[0]; // use the first podcast to test
const demo = document.createElement("podcast-preview");

// give it a title via attribute
demo.setAttribute("title", testPodcast.title);
demo.setAttribute("cover", testPodcast.image);
// add it to the grid
podGrid.prepend(demo);

podcastApp.init();
