import Chart from 'react-apexcharts';
import CONSTANTS from '../../common/constants';

function transformApexFormat(data) {
    const fundData = [
		{
			name: "Nippon Small Cap Fund",
			data: [
				[new Date("2020-01-01").getTime(), 45.3],
				[new Date("2020-01-02").getTime(), 45.7],
				[new Date("2020-01-03").getTime(), 85.7],
			]
		},
		{
			name: "Axis Growth Fund",
			data: [
				[new Date("2020-01-03").getTime(), 60.8],
				[new Date("2020-01-04").getTime(), 61.0]
			]
		}
	];
    return fundData;
}

function ApexChartHelper({ data }) {
	const options = {
		chart: {
			type: 'line',
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: true,
			},
			toolbar: {
				tools: {
					pan: true,
					zoom: true,
					reset: true,
				},
			},
		},
		xaxis: {
			type: 'datetime',
			labels: {
				format: 'dd MMM yy',
			},
		},
		tooltip: {
			shared: true,
			x: {
				format: 'dd MMM yyyy',
			},
		},
		stroke: {
			width: 2,
		},
		markers: {
			size: 0,
		},
		legend: {
			show: true,
			position: 'top',
		},
	};

	return (
		<Chart
			options={options}
			series={data}
			type="line"
			height={CONSTANTS.home.chart_placeholder.height}
		/>
	);
}

export default ApexChartHelper;
export { transformApexFormat }