# DJS02: Podcast Preview Web Component

## Overview

This project is a responsive podcast web application that uses a custom **Web Component** to render podcast previews.

Each podcast card is implemented as a `<podcast-preview>` element that follows the **Web Components** standard. The component is **stateless**, uses **Shadow DOM** for encapsulated styles and markup, and notifies the main application via a **custom event** when the user interacts with it.

The rest of the app is structured with modular JavaScript, clean separation of concerns, and reusable utilities for data, view models, and modals.

---

## Core Objectives

### Web Component Functionality

- Create a **custom HTML element** using `customElements.define()`.
- Accept data (cover image, title, genres, number of seasons, and last updated date) **as attributes or properties**.
- Keep the component **stateless** and reliant on external data provided by the parent.
- Use **Shadow DOM** for style and logic encapsulation to avoid global conflicts.
- Trigger a **custom event** when a user interacts with the component (e.g., clicking), so that the parent application can open a modal or take other actions without tightly coupling to the component’s logic.

---

## 🧠 Features

### 🎙️ `<podcast-preview>` Web Component

- Custom HTML element: `<podcast-preview>`.
- Stateless: gets all data via attributes (`title`, `cover`, `seasons`, `genres`, `updated`, `id`).
- Uses **Shadow DOM** for encapsulated template and styles.
- Dispatches a `podcast-select` custom event on click with the podcast `id` and `title`.

### 🎧 Landing Page

- Renders a responsive grid of `<podcast-preview>` cards from static data.
- Each card displays:
  - Cover image
  - Title
  - Seasons count
  - Genre names
  - Last updated (human-readable)

### 💬 Modal Details

- The main app listens for `podcast-select` on the grid.
- When a card is clicked, the app:
  - Finds the selected podcast
  - Builds a view model (genres, description, formatted date, seasons)
  - Opens a modal with detailed information.

---

## Code Quality & Maintainability

- Write clear, consistent, and modular code.
- Follow **functional and object-oriented programming** patterns.
- Document major functions using **JSDoc comments** (parameters, return types, etc.).
- Use consistent **code formatting** across HTML, CSS, and JavaScript.

---

## Technical Constraints

- Do **not** use any third-party frameworks for creating the web component.
- Use **native JavaScript (ES6+)**, HTML, and CSS.
- No page reloads or navigation.
- Ensure compatibility with modern browsers.

---

## Deliverables

- A working custom Web Component file (e.g., `PodcastPreview.js`).
- An HTML demo page showcasing the component usage.
- A `README.md` file with:
  - How to use and register the component
  - Instructions for passing data
  - How to listen for interaction events

---
