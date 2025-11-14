class PodcastPreview extends HTMLElement {
  constructor() {
    super(); // always call this first in a custom element constructor

    // Create a shadow DOM so styles/markup are encapsulated
    this.attachShadow({ mode: "open" });

    // Basic podcast structure
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--card-bg, #1a1f27);
          color: var(--text, #ffffff);
          border: var(--text-muted) 0.5px solid;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 8px;
        }

        .card {
          background: var(--card-bg);
          border-radius: 16px;
          transition: all 0.3s ease-in-out;
          }
          
        .pod-cover {
          width: 280px;
          height: 250px;
          border-radius: 8px;
          border: var(--text-muted) 0.5px solid;
        }
        
        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

      </style>
        <article class="card">
          <img id="cover" class="pod-cover">
          <h3 id="title"></h3>
        </article>
    
    `;
  }

  // This runs when the element is added to the page
  connectedCallback() {
    const titleFromAttribute = this.getAttribute("title") || "";
    const coverFromAttribute = this.getAttribute("cover") || "";

    const titleEl = this.shadowRoot.getElementById("title");
    const coverEl = this.shadowRoot.getElementById("cover");

    if (titleEl) {
      titleEl.textContent = titleFromAttribute;
    }

    if (coverEl) {
      coverEl.src = coverFromAttribute;
      coverEl.alt = titleFromAttribute
        ? `${titleFromAttribute} cover`
        : "Podcast cover";
    }
  }
}

// Tell the browser that <podcast-preview> uses this class
customElements.define("podcast-preview", PodcastPreview);
