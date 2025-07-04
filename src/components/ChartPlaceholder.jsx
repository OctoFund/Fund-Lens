import CONSTANTS from "../common/constants";
import PLACEHOLDERS from "../common/placeholders";
import ApacheEChartsHelper from "./charts/ApacheEChartHelper";
import PlotlyChartsHelper from "./charts/PlotlyChartHelper";

function ChartPlaceholder({ data, maxLines = CONSTANTS.home.chart_placeholder.max_lines }) {	
	return (
		<div style={{height: CONSTANTS.home.chart_placeholder.height}}>
			{(Object.keys(data["mf"]) == 0 && Object.keys(data["index"]) == 0) ? (<div className="w-full bg-gray-100 rounded flex items-center justify-center" style={{height: CONSTANTS.home.chart_placeholder.height}}>
				<span className="text-gray-400">
					{PLACEHOLDERS.home.chart_placeholder.empty_data.label}
				</span>
			</div>): (<PlotlyChartsHelper 
				data={data}
			/>)}
		</div>
		
	);
}

export default ChartPlaceholder;