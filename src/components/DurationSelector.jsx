function DurationSelector({ duration, setDuration }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-1">Investment duration</label>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${duration === "1Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDuration("1Y")}
        >1 Year</button>
        <button
          className={`px-3 py-1 rounded border ${duration === "3Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDuration("3Y")}
        >3 Years</button>
        <button
          className={`px-3 py-1 rounded border ${duration === "5Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDuration("5Y")}
        >5 Years</button>
        <button
          className={`px-3 py-1 rounded border ${duration === "10Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setDuration("10Y")}
        >10 Years</button>
      </div>
    </div>
  );
}

export default DurationSelector; 