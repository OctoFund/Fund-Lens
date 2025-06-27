function ChartTypeSelector({ chartType, setChartType }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Type of chart</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={chartType}
        onChange={e => setChartType(e.target.value)}
      >
        <option value="">Select chart type</option>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
        <option value="area">Area</option>
      </select>
      <a href="#" className="text-xs text-blue-600 underline mt-1 inline-block">Click here to understand these charts</a>
    </div>
  );
}

export default ChartTypeSelector; 