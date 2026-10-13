export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}