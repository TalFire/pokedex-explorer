interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  searchTerm,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">
        Search Pokémon
      </label>

      <div className="search-input-wrap">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M16.5 16.5L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          id="pokemon-search"
          type="search"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(event) =>
            onSearch(event.target.value)
          }
        />
      </div>
    </div>
  );
}