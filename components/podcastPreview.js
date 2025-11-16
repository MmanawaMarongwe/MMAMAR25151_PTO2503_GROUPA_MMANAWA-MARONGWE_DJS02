class PodcastPreview extends HTMLElement {
  constructor() {
    super(); // always call this first in a custom element constructor

    // Create a shadow DOM so styles/markup are encapsulated
    this.attachShadow({ mode: "open" });

    // Basic podcast structure
    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --bg: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
          --card-bg: linear-gradient(180deg, #1a1f27 0%, #202833 100%);
          --text: #ffffff;
          --text-muted: #9ba1ae;
          --border-line: rgba(128, 128, 128, 0.278);
          --accent: #ff9f3f;
        }

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
          border-radius: 16px;
          transition: all 0.3s ease-in-out;
          }
          
        .pod-cover {
          width: 280px;
          height: 250px;
          border-radius: 8px;
          border: var(--text-muted) 0.5px solid;
        }
        
        h4 {
          font-weight: 600;
        }

        .seasons-text {
          color: var(--accent);
        }

        .text-muted {
          color: var(--text-muted);
          font-size: 14px;
        }

        .genre-tags {
          display: flex;
          flex-direction: rows;
          gap: 4px;
          margin-bottom: 16pxs;
        }

        .tag {
          color: var(--accent);
          background-color: #161b22;
          padding: 10px;
          font-size: 12px;
          border-radius: 12px;
        }

      </style>
        <div class="card">
        <img id="cover" class="pod-cover" alt="">
          <div>
            <h4 id="title"></h4>
            <p id="seasons" class="seasons-text"></p>
            <div id="genres" class="genre-tags"></div>
            <p id="updated" class="text-muted"></p>
          </div>
        </div>
    `;

    //custom event
  }

  // This runs when the element is added to the page
  connectedCallback() {
    const titleFromAttribute = this.getAttribute("title") || "";
    const coverFromAttribute = this.getAttribute("cover") || "";
    const seasonsFromAttribute = this.getAttribute("seasons" || "");
    const genresFromAttribute = this.getAttribute("genres" || "");
    const dateFromAttribute = this.getAttribute("updated" || "");

    const titleEl = this.shadowRoot.getElementById("title");
    const coverEl = this.shadowRoot.getElementById("cover");
    const seasonsEl = this.shadowRoot.getElementById("seasons");
    const genresEl = this.shadowRoot.getElementById("genres");
    const dateEl = this.shadowRoot.getElementById("updated");

    if (titleEl) {
      titleEl.textContent = titleFromAttribute;
    }

    if (coverEl) {
      coverEl.src = coverFromAttribute;
      coverEl.alt = titleFromAttribute
        ? `${titleFromAttribute} cover`
        : "Podcast cover";
    }

    if (seasonsEl) {
      if (seasonsFromAttribute) {
        seasonsEl.textContent = `♡ ${seasonsFromAttribute} seasons`;
      } else {
        seasonsEl.textContent = "";
      }
    }

    if (dateEl) {
      dateEl.textContent = `Last Updated ${dateFromAttribute}`;
    }

    if (genresEl) {
      genresEl.innerHTML = "";
      if (genresFromAttribute) {
        const genresList = genresFromAttribute
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);

        genresList.forEach((genre) => {
          const span = document.createElement("span");
          span.className = "tag";
          span.textContent = genre;
          genresEl.appendChild(span);
        });
      }
    }

    this.addEventListener("click", () => {
      const idFromAttribute = this.getAttribute("id") || "";

      this.dispatchEvent(
        new CustomEvent("podcast-select", {
          bubbles: true,
          composed: true,
          detail: {
            id: idFromAttribute,
            title: titleFromAttribute,
          },
        })
      );
    });
  }
}

// Tell the browser that <podcast-preview> uses this class
customElements.define("podcast-preview", PodcastPreview);
