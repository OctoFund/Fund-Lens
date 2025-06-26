function RollingTypeSelector({ rollingType, setRollingType }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Rolling Returns / Value</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={rollingType}
        onChange={e => setRollingType(e.target.value)}
      >
        <option value="">Select type</option>
        <option value="sip-xirr">Sip Rolling Returns (XIRR %)</option>
        <option value="sip-abs">Sip Rolling Absolute Value (₹)</option>
        <option value="lumpsum-cagr">Lumpsum Rolling Returns (CAGR %)</option>
        <option value="lumpsum-abs">Lumpsum Rolling Absolute Value (₹)</option>
        <option value="stddev">Standard Deviation Rolling Annualized Monthly (Risk) (%)</option>
      </select>
    </div>
  );
}

export default RollingTypeSelector; 