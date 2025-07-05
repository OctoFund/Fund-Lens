import { useState, useEffect } from "react";
import Header from "./components/Header";
import GrowthDirectCheckbox from "./components/GrowthDirectCheckbox";
import ChartTypeSelector from "./components/ChartTypeSelector";
import DurationSelector from "./components/DurationSelector";
import ChartPlaceholder from "./components/ChartPlaceholder";
import PlotGraphButton from "./components/PlotGraphButton";

import PLACEHOLDERS from "./common/placeholders";
import dataRepository from "./data/repository";
import SearchMutualFunds from "./components/SearchMutualFunds";
import SearchIndexes from "./components/SearchIndexes";
import Loader from "./components/loader";
import SIPAmountProvider from "./components/SIPAmountProvider";
import LumpsumAmountProvider from "./components/LumpsumAmountProvider";

function App() {
	document.title = PLACEHOLDERS.home.title;
	const [fundOptions, setFundOptions] = useState([]);
	const [indexOptions, setIndexOptions] = useState([]);
	const [selectedMutualFunds, setSelectedMutualFunds] = useState([]);
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const [showGrowthDirect, setShowGrowthDirect] = useState(false);
	const [chartType, setChartType] = useState(1);
	const [duration, setDuration] = useState();
	const [sipAmount, setSipAmount] = useState(0);
	const [lumpsumAmount, setLumpsumAmount] = useState(0);
	const [showGraph, setShowGraph] = useState(true);
	const [loader, setLoader] = useState(true);
	const [chartData, setChartData] = useState({"mf": {},
        "index":{}});

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
				{(chartType == 2 || chartType == 4 || chartType == 6) && 
				<DurationSelector
					duration={duration}
					setDuration={setDuration}
				/>}
				{(chartType == 3) && 
				<SIPAmountProvider
					sipAmount={sipAmount}
					setSipAmount={setSipAmount}
				/>}
				{(chartType == 5) && 
				<LumpsumAmountProvider
					sipAmount={sipAmount}
					setSipAmount={setSipAmount}
				/>}
				<PlotGraphButton 
					chartData={chartData}
					setChartData={setChartData} 
					chartType={chartType}
					selectedMutualFunds={selectedMutualFunds}
					selectedIndexes={selectedIndexes}
					setLoader={setLoader}
				/>
				{showGraph && (
					<ChartPlaceholder data={chartData} chartType={chartType} maxLines={5} />
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
