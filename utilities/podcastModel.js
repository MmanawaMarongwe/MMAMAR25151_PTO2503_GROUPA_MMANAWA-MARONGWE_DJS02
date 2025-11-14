/**
 * Create a podcast view model (data + small helper methods) for the UI.
 * - Resolves genre IDs → names
 * - Formats `updated` into human text (e.g., "Today", "2 weeks ago")
 * - Exposes season info for the podcast
 *
 * @param {{id:string,title:string,image:string,seasons?:number|any[],description?:string,updated?:string|number|Date,genres?:string[]}} podcastData -  A single item from  podcasts array.
 * @param {{id:string,title:string}[]} genres - All genres; used to map podcast genre IDs to names.
 * @param {{id:string,seasonDetails:Array<{title?:string,episodes?:number}>}[]} seasons - Season rows keyed by podcast id; used by `seasonTitles()`.
 * @returns {{
 *   id: string,
 *   title: string,
 *   image: string,
 *   seasons: number|any[],
 *   description: string,
 *   updated: string|number|Date|undefined,
 *   genreNames: () => string[],
 *   formattedUpdatedAt: () => string,
 *   seasonTitles: () => Array<{title?:string,episodes?:number}>|undefined }} - Plain object ready for rendering with podcast with helper methods.
 */
export function makePodcast(podcastData, genres, seasons) {
  const genreTitleById = (id) => genres.find((g) => g.id === id)?.title;
  const seasonsById = (id) => seasons.find((s) => s.id === id)?.seasonDetails;

  return {
    id: podcastData.id,
    title: podcastData.title,
    image: podcastData.image,
    seasons: podcastData.seasons || [],
    description: podcastData.description || "",
    updated: podcastData.updated,

    genreNames() {
      const ids = podcastData.genres || [];
      return ids.map(genreTitleById).filter(Boolean); //return an array of titles if their id
    },

    formattedUpdatedAt() {
      const updatedValue = podcastData.updated;
      if (!updatedValue) return "—";
      const dt = new Date(updatedValue);
      if (isNaN(dt)) return "—";

      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(dt);
    },

    seasonTitles() {
      const seasonInfo = seasonsById(podcastData.id);
      return seasonInfo;
    },
  };
}
