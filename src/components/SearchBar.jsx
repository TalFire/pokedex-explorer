export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">Search Pokémon</label>
      <div className="search-input-wrap">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          id="pokemon-search"
          type="text"
          placeholder="Search by Pokémon name…"
          autoComplete="off"
          spellCheck={false}
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
    </div>
  );
}
