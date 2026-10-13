export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">
        Search Pokémon
      </label>

      <input
        id="pokemon-search"
        type="text"
        placeholder="Type a Pokémon name..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}