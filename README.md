# DJS02: Podcast Preview Web Component

## Overview

This project is a responsive podcast web application that uses a custom **Web Component** to render podcast previews.

Instead of regular cards, each podcast is displayed using a `<podcast-preview>` element. The component is **stateless**, uses **Shadow DOM** for encapsulated markup and styles, and notifies the main application via a **custom event** when the user clicks a card.

---

## 🧠 Features

### 🎙️ Podcast Preview Component

- Custom HTML element: `<podcast-preview>`.
- Display data is passed in via attributes:
  - `title`
  - `cover`
  - `seasons`
  - `genres`
  - `updated`
  - `id`
- Uses **Shadow DOM** to keep the card’s structure and styles encapsulated.
- Dispatches a `podcast-select` custom event when the card is clicked.

### 🎧 Landing Page & Modal

- Renders a grid of `<podcast-preview>` cards from static podcast data.
- Each card shows:
  - 🎨 Cover image
  - 🎧 Podcast title
  - 📅 Number of seasons
  - 🏷️ Genre names
  - ⏰ Last updated (human-readable)
- When a card is selected:
  - The app listens for `podcast-select` on the grid.
  - Looks up the selected podcast.
  - Builds a view model with helper data (genres, description, formatted date, seasons).
  - Opens a modal with detailed information.

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (responsive, mobile-first design)
- **JavaScript (ES6 Modules + Web Components)**

---

## 📂 Setup Instructions

1. Clone or download this repository.
2. Open the project folder on your computer.
3. Open `index.html` in your browser, or run it with a local dev server (e.g. VS Code **Live Server**).
4. Browse the list of podcasts rendered on the main page using `<podcast-preview>`.
5. Click a podcast preview to open its modal with more details.

---

## 🧩 Code Architecture

| Module                              | Responsibility                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `data.js`                           | Static podcast, genre, and season data                                                                                         |
| `createOption.js`                   | Builds `<option>` elements for the genre dropdown                                                                              |
| `makePodcast.js`                    | Creates a podcast view model (genre names, formatted date, helper methods)                                                     |
| `components/podcastPreview.js`      | Defines the `<podcast-preview>` Web Component (Shadow DOM, attributes, custom event)                                           |
| `createModal.js` / `renderModal.js` | Builds and renders the podcast detail modal                                                                                    |
| `createPodcastApp.js`               | Populates the genre dropdown, renders `<podcast-preview>` elements, and wires up the `podcast-select` event to the modal logic |
| `main.js`                           | Entry point — imports modules, selects DOM elements, and calls `createPodcastApp().init()`                                     |

Each module follows **single responsibility**, keeping the codebase readable and easier to maintain.

---

## 💻 Code Structure & Maintainability

- Logic is split into small, focused ES6 modules.
- The web component is **stateless** and only relies on attributes for data.
- The main app coordinates data, rendering, and modal behavior.
- Major functions and modules are documented with JSDoc for clarity.

---

## Using the `<podcast-preview>` Web Component

### 1. Registering the component

- The component class lives in `components/podcastPreview.js`.
- It is registered with `customElements.define("podcast-preview", PodcastPreview)`.
- `main.js` imports this file so `<podcast-preview>` is available everywhere in the app.

### 2. Passing data via attributes

- The parent app creates one `<podcast-preview>` per podcast in `createPodcastApp.js`.
- For each podcast, it sets attributes like `title`, `cover`, `seasons`, `genres`, `updated`, and `id` using values from the `makePodcast` view model.
- Inside the component, `connectedCallback()` reads these attributes and updates the internal DOM in the Shadow Root.

### 3. Listening for interaction events

- When a card is clicked, `<podcast-preview>` dispatches a `podcast-select` custom event that includes the podcast `id` and `title` in `event.detail`.
- The main app listens for `podcast-select` on the podcast grid (`podGrid`).
- When the event fires, the app:
  - Finds the matching podcast in `data.js`.
  - Builds the view model with `makePodcast`.
  - Passes that data to the modal helper to open the detailed view.

---

## ✅ Expected Outcome

A functional podcast interface where:

- Each podcast preview is rendered by a reusable `<podcast-preview>` Web Component.
- The component’s markup and styles are encapsulated using Shadow DOM.
- The component stays stateless and communicates with the app via a custom event.
- The main app handles data lookup and modal rendering in response to user interaction.

---

## 🔮 Future Improvements

- Add keyboard accessibility to `<podcast-preview>` (e.g. activate with Enter and Space).
- Allow passing full podcast objects via a property (`card.podcast = pod`) as an alternative to attributes.
- Add filtering and search that still use `<podcast-preview>` for rendering.
- Extract shared design tokens (colors, spacing, typography) into a small design system used by both global styles and the component.
