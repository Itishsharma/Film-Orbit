const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Search movies..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-md p-2 rounded-md border border-border bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}

export default SearchBar
