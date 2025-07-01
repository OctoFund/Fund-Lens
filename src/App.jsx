import { useState, useEffect } from "react";
import Header from "./components/Header";
import GrowthDirectCheckbox from "./components/GrowthDirectCheckbox";
import ChartTypeSelector from "./components/ChartTypeSelector";
import DurationSelector from "./components/DurationSelector";
import ChartPlaceholder from "./components/ChartPlaceholder";

import PLACEHOLDERS from "./common/placeholders";
import dataRepository from "./data/repository";
import SearchMutualFunds from "./components/SearchMutualFunds";
import SearchIndexes from "./components/SearchIndexes";
import Loader from "./components/loader";

// Convert generateChartData output to ApexCharts format
function convertToApexSeries(chartData) {
	// chartData.labels: array of date strings (e.g., 'Jan 21')
	// chartData.datasets: array of { label, data }
	// We'll reconstruct the date for each index using the original start date
	const startDate = new Date('2021-01-01');
	return chartData.datasets.map(dataset => {
		const data = dataset.data.map((value, idx) => {
			// Calculate the date, skipping weekends
			let date = new Date(startDate);
			let added = 0, i = 0;
			while (added < idx) {
				date.setDate(date.getDate() + 1);
				if (date.getDay() !== 0 && date.getDay() !== 6) {
					added++;
				}
				i++;
				if (i > 4000) break; // safety
			}
			return [date.getTime(), value];
		});
		return { name: dataset.label, data };
	});
}

function App() {
	document.title = PLACEHOLDERS.home.title;
	const [fundOptions, setFundOptions] = useState([]);
	const [indexOptions, setIndexOptions] = useState([]);
	const [selectedMutualFunds, setSelectedMutualFunds] = useState([]);
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const [showGrowthDirect, setShowGrowthDirect] = useState(false);
	const [chartType, setChartType] = useState("");
	const [duration, setDuration] = useState("1Y");
	const [showGraph, setShowGraph] = useState(false);
	const [loader, setLoader] = useState(true);

	async function showGrowthDirectFunds() {
		const fundsList = await dataRepository.getAllDirectFundsList();
		var funds = [];
		fundsList.forEach((fund) => {
			funds.push({
				value: fund.code,
				label: fund.name,
			});
		});
		setFundOptions(funds);
		setLoader(false);
	}

	async function renderFirstData() {
		const fundsList = await dataRepository.getAllDirectOrRegularFundsList();
		var funds = [];
		fundsList.forEach((fund) => {
			funds.push({
				value: fund.code,
				label: fund.name,
			});
		});
		setFundOptions(funds);

		const indexesList = await dataRepository.getAllIndexList();
		var indexes = [];
		indexesList.forEach((index) => {
			indexes.push({
				value: index,
				label: index,
			});
		});
		setIndexOptions(indexes);
		setLoader(false);
	}

	useEffect(() => {
		renderFirstData();
	}, []);

	useEffect(() => {
		setLoader(true);
		if (showGrowthDirect) {
			showGrowthDirectFunds();
		} else {
			renderFirstData();
		}
	}, [showGrowthDirect]);

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
			{loader && (
				<Loader />
			)}
			<div className="max-w-6xl w-full bg-white rounded-lg shadow p-6">
				<Header />
				<div className="flex flex-col lg:flex-row lg:gap-4">
					<div className="lg:w-1/2">
						<SearchMutualFunds
							fundOptions={fundOptions}
							selectedMutualFunds={selectedMutualFunds}
							setSelectedMutualFunds={setSelectedMutualFunds}
						/>
					</div>
					<div className="lg:w-1/2">
						<SearchIndexes
							indexesOptions={indexOptions}
							selectedIndexes={selectedIndexes}
							setSelectedIndexes={setSelectedIndexes}
						/>
					</div>
				</div>
				<GrowthDirectCheckbox
					showGrowthDirect={showGrowthDirect}
					setShowGrowthDirect={setShowGrowthDirect}
				/>
				<ChartTypeSelector
					chartType={chartType}
					setChartType={setChartType}
				/>
				<DurationSelector
					duration={duration}
					setDuration={setDuration}
				/>
				<div className="flex justify-center">
					<button
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
						onClick={() => setShowGraph(true)}
					>
						Plot Graph
					</button>
				</div>
				{showGraph && (
					<ChartPlaceholder data={[]} maxLines={5} />
				)}
			</div>
		</div>
	);
}

// Simple CSS spinner
const loaderStyle = document.createElement('style');
loaderStyle.innerHTML = `
.loader-spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(loaderStyle);

export default App;
