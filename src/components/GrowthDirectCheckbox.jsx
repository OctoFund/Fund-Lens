function GrowthDirectCheckbox({ showGrowthDirect, setShowGrowthDirect }) {
  return (
    <div className="flex items-center mb-4">
      <input
        id="growth-direct"
        type="checkbox"
        checked={showGrowthDirect}
        onChange={() => setShowGrowthDirect(v => !v)}
        className="mr-2"
      />
      <label htmlFor="growth-direct" className="text-sm">
        Show Growth Direct funds only (ignoring other like dividends and regular plans)
      </label>
    </div>
  );
}

export default GrowthDirectCheckbox; 