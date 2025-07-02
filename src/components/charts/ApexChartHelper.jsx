import Chart from 'react-apexcharts';
import CONSTANTS from '../../common/constants';

function parseDMY(dateStr) {
	const [day, month, year] = dateStr.split("-");
	return new Date(`${year}-${month}-${day}`);
}

function parseDMY_MMM(dateStr) {
	const [day, monthStr, year] = dateStr.split(" ");
	const monthMap = {
		Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
		Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
	};
	const month = monthMap[monthStr];
	return new Date(Number(year), month, Number(day));
}

function transformApexFormat(data) {
	const allTimestampsSet = new Set();
	Object.values(data["mf"]).forEach(fundArr => {
		fundArr.forEach(details => {
			allTimestampsSet.add(parseDMY(details.date).getTime());
		});
	});
	Object.values(data["index"]).forEach(fundArr => {
		fundArr.forEach(details => {
			allTimestampsSet.add(parseDMY_MMM(details.Date).getTime());
		});
	});
	const allTimestamps = Array.from(allTimestampsSet).sort((a, b) => a - b);

	const fundMaps = {};
	Object.keys(data["mf"]).forEach(key => {
		const map = {};
		data["mf"][key].forEach(details => {
			map[parseDMY(details.date).getTime()] = Number.parseFloat(details.nav);
		});
		fundMaps[key] = map;
	});

	Object.keys(data["index"]).forEach(key => {
		const map = {};
		data["index"][key].forEach(details => {
			map[parseDMY_MMM(details.Date).getTime()] = Number.parseFloat(details.TotalReturnsIndex);
		});
		fundMaps[key] = map;
	});

	const fundFinalChartDataMF = Object.keys(data["mf"]).map(key => {
		const fundData = allTimestamps.map(ts => [ts, fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : null]);
		return {
			name: key,
			data: fundData
		};
	});

	const fundFinalChartDataIndex = Object.keys(data["index"]).map(key => {
		const indexData = allTimestamps.map(ts => [ts, fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : null]);
		return {
			name: key,
			data: indexData
		};
	});

	const fundFinalChartData = [...fundFinalChartDataIndex, ...fundFinalChartDataMF];

	return fundFinalChartData;
}

function ApexChartHelper({ data }) {

	const series = transformApexFormat(data);

	const options = {
		chart: {
			type: 'line',
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: true,
			},
			animations: { 
				enabled: false 
			},
			toolbar: { 
				show: false 
			}
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
		},
		dataLabels: { enabled: false },
	};

	return (
		<Chart
			options={options}
			series={series}
			type="line"
			height={CONSTANTS.home.chart_placeholder.height}
		/>
	);
}

export default ApexChartHelper;