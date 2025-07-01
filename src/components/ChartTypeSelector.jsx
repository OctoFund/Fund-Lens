import Select from "react-select";
import REFERENCES from "../common/references";
import PLACEHOLDERS from "../common/placeholders";


function ChartTypeSelector({ chartType, setChartType }) {
	const chartOptions = [
		{ value: 1, label: PLACEHOLDERS.home.chart_type_selector.options.nav_or_index },
		{ value: 2, label: PLACEHOLDERS.home.chart_type_selector.options.sip_xirr },
		{ value: 3, label: PLACEHOLDERS.home.chart_type_selector.options.sip_abs },
		{ value: 4, label: PLACEHOLDERS.home.chart_type_selector.options.lumpsum_cagr },
		{ value: 5, label: PLACEHOLDERS.home.chart_type_selector.options.lumpsum_abs },
		{ value: 6, label: PLACEHOLDERS.home.chart_type_selector.options.stddev }
	];

	const selectedOption = chartOptions.find(option => option.value === chartType) || null;

	return (
		<div className="mb-4">
			<label className="block text-sm font-medium mb-1">
				{PLACEHOLDERS.home.chart_type_selector.label}
			</label>
			<Select
				options={chartOptions}
				value={selectedOption}
				onChange={option => setChartType(option ? option.value : "")}
				placeholder={PLACEHOLDERS.home.chart_type_selector.placeholder}
				classNamePrefix="select"
				isClearable
			/>
			<a 
				href={REFERENCES.home.chart_type_selector.url} 
				className="text-xs text-blue-600 underline mt-1 inline-block"
			>
				{PLACEHOLDERS.home.chart_type_selector.info_label}
			</a>
		</div>
	);
}

export default ChartTypeSelector; 