import ReactECharts from 'echarts-for-react';
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

function transformEchartsFormat(data) {
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

	const fundFinalChartDataMF = Object.keys(data["mf"]).map(key => ({
		name: key,
		type: 'line',
		showSymbol: false,
		sampling: 'lttb',
		large: true,
		data: allTimestamps.map(ts => [ts, fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : null]),
	}));

	const fundFinalChartDataIndex = Object.keys(data["index"]).map(key => ({
		name: key,
		type: 'line',
		showSymbol: false,
		sampling: 'lttb',
		large: true,
		data: allTimestamps.map(ts => [ts, fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : null]),
	}));

	return [...fundFinalChartDataIndex, ...fundFinalChartDataMF];
}

function transformEchartsFormatRaw(data) {
	const fundFinalChartDataMF = Object.keys(data["mf"]).map(key => ({
		name: key,
		type: 'line',
		showSymbol: false,
		sampling: 'lttb',
		large: true,
		data: data["mf"][key].map(details => [parseDMY(details.date).getTime(), Number.parseFloat(details.nav)]),
	}));

	const fundFinalChartDataIndex = Object.keys(data["index"]).map(key => ({
		name: key,
		type: 'line',
		showSymbol: false,
		sampling: 'lttb',
		large: true,
		data: data["index"][key].map(details => [parseDMY_MMM(details.Date).getTime(), Number.parseFloat(details.TotalReturnsIndex)]),
	}));

	return [...fundFinalChartDataIndex, ...fundFinalChartDataMF];
}

function transformEchartsFormatForwardFill(data) {
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

	const fundFinalChartDataMF = [];

    for (const key of Object.keys(data["mf"])) {
        const seriesObj = {
            name: key,
            type: 'line',
            showSymbol: false,
            sampling: 'lttb',
            large: true,
            data: []
        };

        var prev = 0;
        for (const ts of allTimestamps) {
            const value = fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : prev;
            if(fundMaps[key][ts] !== undefined) {
                prev = fundMaps[key][ts];
            }
            seriesObj.data.push([ts, value]);
        }

        fundFinalChartDataMF.push(seriesObj);
    }

    var fundFinalChartDataIndex = [];

    for (const key of Object.keys(data["index"])) {
        const seriesObj = {
            name: key,
            type: 'line',
            showSymbol: false,
            sampling: 'lttb',
            large: true,
            data: []
        };

        var prev = 0;
        for (const ts of allTimestamps) {
            const value = fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : prev;
            if(fundMaps[key][ts] !== undefined) {
                prev = fundMaps[key][ts];
            }
            seriesObj.data.push([ts, value]);
        }

        fundFinalChartDataIndex.push(seriesObj);
    }

	return [...fundFinalChartDataIndex, ...fundFinalChartDataMF];
}

function ApacheEChartsHelper({ data }) {
	const series = transformEchartsFormatForwardFill(data);

	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
		},
		xAxis: {
			type: 'time',
			axisLabel: {
				formatter: (value) => new Date(value).toLocaleDateString('en-IN', {
					month: 'short',
					day: '2-digit',
					year: '2-digit'
				})
			}
		},
		yAxis: {
			type: 'value',
			name: 'Value',
			scale: true
		},
		dataZoom: [
			{ type: 'slider', start: 0, end: 100 },
			{ type: 'inside', start: 0, end: 100 }
		],
		legend: {
			type: 'scroll',
			top: 10,
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '15%'
		},
		series,
	};

	return (
		<ReactECharts
			option={option}
			style={{ height: CONSTANTS.home.chart_placeholder.height, width: '100%' }}
		/>
	);
}

export default ApacheEChartsHelper;