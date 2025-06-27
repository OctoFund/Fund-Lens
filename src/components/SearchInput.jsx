function SearchInput({ search, setSearch }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Mutual Fund Index (TRI)</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Start typing the mutual fund name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchInput; 