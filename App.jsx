import { useState } from "react";

const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'");

export default function App() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function searchShows(event) {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      setError("Please enter a title to search.");
      setShows([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(term)}`
      );
      if (!response.ok) throw new Error("The search service is unavailable. Please try again.");
      const data = await response.json();
      setShows(data.map((item) => item.show).filter(Boolean));
      if (data.length === 0) setError("No matching titles found. Try another search.");
    } catch (err) {
      setShows([]);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ScreenScout home">
          <span className="brand-icon">▶</span> ScreenScout
        </a>
        <span className="top-note">Discover your next watch</span>
      </header>

      <section className="hero">
        <p className="eyebrow">SEARCH • DISCOVER • WATCH</p>
        <h1>Find a story<br /><span>worth watching.</span></h1>
        <p className="intro">
          Search movies and TV shows, explore ratings and genres, and discover something new.
        </p>

        <form className="search-form" onSubmit={searchShows}>
          <label className="sr-only" htmlFor="title-search">Search titles</label>
          <input
            id="title-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try a title, e.g. Sherlock..."
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        <p className="api-note">Search results are provided by the TVmaze public API.</p>
      </section>

      <section className="results" aria-live="polite">
        <div className="results-heading">
          <h2>{searched ? "Search results" : "Start exploring"}</h2>
          {shows.length > 0 && <span>{shows.length} titles found</span>}
        </div>

        {loading && <p className="message">Looking for titles...</p>}
        {!loading && error && <p className="message error">{error}</p>}
        {!loading && !searched && (
          <div className="empty-state">
            <span className="empty-icon">⌕</span>
            <p>Enter a title above to see matching movies and shows.</p>
          </div>
        )}

        <div className="grid">
          {shows.map((show) => (
            <article className="card" key={show.id}>
              <div className="poster">
                {show.image?.medium ? (
                  <img src={show.image.medium} alt={`${show.name} poster`} loading="lazy" />
                ) : (
                  <div className="poster-placeholder">No image available</div>
                )}
              </div>
              <div className="card-content">
                <h3>{show.name}</h3>
                <div className="meta">
                  {show.premiered?.slice(0, 4) || "Year unknown"}
                  {show.rating?.average ? ` · ★ ${show.rating.average}/10` : ""}
                </div>
                <p className="genres">
                  {show.genres?.length ? show.genres.join(" · ") : "Genre not listed"}
                </p>
                <p className="summary">
                  {stripHtml(show.summary) || "No summary is available for this title."}
                </p>
                {show.officialSite && (
                  <a className="details-link" href={show.officialSite} target="_blank" rel="noreferrer">
                    Official site ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Built with React · JavaScript · CSS · REST API</p>
        <p>Show data: <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">TVmaze API</a></p>
      </footer>
    </main>
  );
}