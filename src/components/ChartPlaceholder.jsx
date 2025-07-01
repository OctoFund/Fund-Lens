import ApexChartHelper, { transformApexFormat } from "./charts/ApexChartHelper";

function ChartPlaceholder({ data, maxLines = 5 }) {
	const chartData = transformApexFormat(data);
	return (
		<ApexChartHelper 
			data={chartData}
		/>
	);
}

export default ChartPlaceholder;