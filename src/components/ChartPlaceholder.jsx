import CONSTANTS from "../common/constants";
import PLACEHOLDERS from "../common/placeholders";
import ApacheEChartsHelper from "./charts/ApacheEChartHelper";
import PlotlyChartsHelper, { transformPlotlyJsDataForwardFill } from "./charts/PlotlyChartHelper";

function ChartPlaceholder({ data, chartType, maxLines = CONSTANTS.home.chart_placeholder.max_lines }) {	
	var chartData = [];
	if(chartType == 1) {
		chartData = transformPlotlyJsDataForwardFill(data);
	}
	else if(chartType == 2) {
		
	}
	else if(chartType == 3) {
		
	}
	else if(chartType == 4) {
		
	}
	else if(chartType == 5) {
		
	}
	else if(chartType == 6) {
		
	}
	else {
		throw Error("Invalid chart type passed");
	}
	return (
		<div style={{height: CONSTANTS.home.chart_placeholder.height}}>
			{(Object.keys(data["mf"]) == 0 && Object.keys(data["index"]) == 0) ? (<div className="w-full bg-gray-100 rounded flex items-center justify-center" style={{height: CONSTANTS.home.chart_placeholder.height}}>
				<span className="text-gray-400">
					{PLACEHOLDERS.home.chart_placeholder.empty_data.label}
				</span>
			</div>): (<PlotlyChartsHelper 
				data={chartData}
			/>)}
		</div>
		
	);
}

export default ChartPlaceholder;