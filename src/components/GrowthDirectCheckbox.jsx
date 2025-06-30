import PLACEHOLDERS from "../common/placeholders";

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
        {PLACEHOLDERS.home.show_growth_fund_checkbox.label}
      </label>
    </div>
  );
}

export default GrowthDirectCheckbox; 