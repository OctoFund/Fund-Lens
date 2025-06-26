function ValueTypeSelector({ valueType, setValueType }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">NAV or Index Value</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={valueType}
        onChange={e => setValueType(e.target.value)}
      >
        <option value="NAV">NAV</option>
        <option value="Index">Index Value</option>
      </select>
    </div>
  );
}

export default ValueTypeSelector; 