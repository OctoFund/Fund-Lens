import Plot from 'react-plotly.js';
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

function transformPlotlyChartsFormatForwardFill(data) {
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
            if (fundMaps[key][ts] !== undefined) {
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
            if (fundMaps[key][ts] !== undefined) {
                prev = fundMaps[key][ts];
            }
            seriesObj.data.push([ts, value]);
        }

        fundFinalChartDataIndex.push(seriesObj);
    }

    return [...fundFinalChartDataIndex, ...fundFinalChartDataMF];
}

function transformPlotlyJsDataForwardFill(data) {
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

    const result = [];

    for (const key of Object.keys(data["mf"])) {
        let prev = null;
        const x = [];
        const y = [];
        for (const ts of allTimestamps) {
            const value = fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : prev;
            if (fundMaps[key][ts] !== undefined) {
                prev = fundMaps[key][ts];
            }
            x.push(new Date(ts)); // or ts if you want timestamps
            y.push(value);
        }
        result.push({
            x,
            y,
            mode: 'lines+markers',
            name: key,
            type: 'scattergl',
            line: { width: 1 }
        });
    }

    for (const key of Object.keys(data["index"])) {
        let prev = null;
        const x = [];
        const y = [];
        for (const ts of allTimestamps) {
            const value = fundMaps[key][ts] !== undefined ? fundMaps[key][ts] : prev;
            if (fundMaps[key][ts] !== undefined) {
                prev = fundMaps[key][ts];
            }
            x.push(new Date(ts));
            y.push(value);
        }
        result.push({
            x,
            y,
            mode: 'lines+markers',
            name: key,
            type: 'scattergl',
            line: { width: 1 }
        });
    }

    return result;
}


function PlotlyChartsHelper({ data }) {
    /*
        [
                {
                    x: [
                        '2024-05-01',
                        '2024-05-02',
                        '2024-05-03',
                        '2024-05-04'
                    ],
                    y: [10, 15, 13, 17],
                    mode: 'lines+markers',
                    name: 'Series 1',
                    type: 'scattergl',
                },
                {
                    x: [
                        '2024-05-01',
                        '2024-05-02',
                        '2024-05-03',
                        '2024-05-04'
                    ],
                    y: [16, 5, 11, 9],
                    mode: 'lines+markers',
                    name: 'Series 2',
                    type: 'scattergl',
                },
            ]
    */
    return (
        <Plot
            data={data}
            layout={{
                // width: 1050,
                // height: 400,
                title: 'Multiple Lines Chart with Dates',
                xaxis: { title: 'Date' },
                yaxis: { title: 'Y Axis' },
                hovermode: 'x unified',
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: CONSTANTS.home.chart_placeholder.height }}
        />
    );
}

export default PlotlyChartsHelper;
export { transformPlotlyJsDataForwardFill }