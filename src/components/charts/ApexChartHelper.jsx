import Chart from 'react-apexcharts';
import CONSTANTS from '../../common/constants';

function parseDMY(dateStr) {
	const [day, month, year] = dateStr.split("-");
	return new Date(`${year}-${month}-${day}`);
}

function transformApexFormat(data) {
	const allTimestampsSet = new Set();
	Object.values(data).forEach(fundArr => {
		fundArr.forEach(details => {
			allTimestampsSet.add(parseDMY(details.date).getTime());
		});
	});
	const allTimestamps = Array.from(allTimestampsSet).sort((a, b) => a - b);

	const fundMaps = {};
	Object.keys(data).forEach(key => {
		const map = {};
		data[key].forEach(details => {
			map[parseDMY(details.date).getTime()] = Number.parseFloat(details.nav);
		});
		fundMaps[key] = map;
	});

	const fundFinalChartData = Object.keys(data).map(key => {
		const fundData = allTimestamps.map(ts => [ts, fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : null]);
		return {
			name: key,
			data: fundData
		};
	});

	return fundFinalChartData;
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
		yaxis: {
			title: {
				text: 'Value'
			}
		},
		tooltip: {
			shared: true,
			intersect: false
		}
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