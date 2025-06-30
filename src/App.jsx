import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import GrowthDirectCheckbox from "./components/GrowthDirectCheckbox";
import SelectedFundsDisplay from "./components/SelectedFundsDisplay";
import ChartTypeSelector from "./components/ChartTypeSelector";
import ValueTypeSelector from "./components/ValueTypeSelector";
import RollingTypeSelector from "./components/RollingTypeSelector";
import DurationSelector from "./components/DurationSelector";
import ChartPlaceholder, { generateChartData } from "./components/ChartPlaceholder";

import PLACEHOLDERS from "./common/placeholders";
import dataRepository from "./data/repository";
import SearchMutualFunds from "./components/SearchMutualFunds";
import SearchIndexes from "./components/SearchIndexes";

function App() {
	document.title = PLACEHOLDERS.home.title;
	const [fundOptions, setFundOptions] = useState([]);
	const [indexOptions, setIndexOptions] = useState([]);
	const [selectedMutualFunds, setSelectedMutualFunds] = useState([]);
	const [selectedIndexes, setSelectedIndexes] = useState([]);
	const [showGrowthDirect, setShowGrowthDirect] = useState(false);
	const [chartType, setChartType] = useState("");
	const [valueType, setValueType] = useState("NAV");
	const [rollingType, setRollingType] = useState("");
	const [duration, setDuration] = useState("1Y");

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
	}

	useEffect(() => {
		renderFirstData();
	}, []);

	useEffect(() => {
		if (showGrowthDirect) {
			showGrowthDirectFunds();
		} else {
			renderFirstData();
		}
	}, [showGrowthDirect]);

	const chartData = generateChartData();

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
			<div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
				<Header />
				<SearchMutualFunds
					fundOptions={fundOptions}
					selectedMutualFunds={selectedMutualFunds}
					setSelectedMutualFunds={setSelectedMutualFunds}
				/>
				<SearchIndexes
					indexesOptions={indexOptions}
					selectedIndexes={selectedIndexes}
					setSelectedIndexes={setSelectedIndexes}
				/>
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
				<button
					onClick={() => {
						console.log(selectedIndexes);
					}}
				>
					{"click"}
				</button>
				<ChartPlaceholder data={chartData} maxLines={5} />
			</div>
		</div>
	);
}


export default App;
