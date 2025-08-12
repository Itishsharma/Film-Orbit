const Filters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        className="bg-zinc-800 p-2 rounded text-white"
        value={filters.genre}
        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="27">Horror</option>
        <option value="10749">Romance</option>
        {/* Add more genre IDs as needed */}
      </select>

      <select
        className="bg-zinc-800 p-2 rounded text-white"
        value={filters.year}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="">Any Year</option>
        {Array.from({ length: 24 }, (_, i) => {
          const year = 2024 - i
          return <option key={year}>{year}</option>
        })}
      </select>

      <select
        className="bg-zinc-800 p-2 rounded text-white"
        value={filters.rating}
        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
      >
        <option value="">Any Rating</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>
    </div>
  )
}

export default Filters
