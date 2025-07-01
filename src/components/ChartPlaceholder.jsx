import CONSTANTS from "../common/constants";
import PLACEHOLDERS from "../common/placeholders";
import ApexChartHelper, { transformApexFormat } from "./charts/ApexChartHelper";

function ChartPlaceholder({ data, maxLines = CONSTANTS.home.chart_placeholder.max_lines }) {
	const chartData = transformApexFormat(data);
	return (
		<div style={{height: CONSTANTS.home.chart_placeholder.height}}>
			{(data.length == 0) ? (<div className="w-full bg-gray-100 rounded flex items-center justify-center" style={{height: CONSTANTS.home.chart_placeholder.height}}>
				<span className="text-gray-400">
					{PLACEHOLDERS.home.chart_placeholder.empty_data.label}
				</span>
			</div>): (<ApexChartHelper 
				data={chartData}
			/>)}
		</div>
		
	);
}

export default ChartPlaceholder;