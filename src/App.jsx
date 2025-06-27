import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import GrowthDirectCheckbox from "./components/GrowthDirectCheckbox";
import SelectedFundsDisplay from "./components/SelectedFundsDisplay";
import ChartTypeSelector from "./components/ChartTypeSelector";
import ValueTypeSelector from "./components/ValueTypeSelector";
import RollingTypeSelector from "./components/RollingTypeSelector";
import DurationSelector from "./components/DurationSelector";
import ChartPlaceholder from "./components/ChartPlaceholder";

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
	const [showGrowthDirect, setShowGrowthDirect] = useState(true);
	const [chartType, setChartType] = useState("");
	const [valueType, setValueType] = useState("NAV");
	const [rollingType, setRollingType] = useState("");
	const [duration, setDuration] = useState("1Y");

	async function renderFirstData() {
		const fundsList = await dataRepository.getAllDirectOrRegularFundsList();
		var funds = [];
		fundsList.forEach(fund => {
			funds.push({
				value: fund.code, 
				label: fund.name
			});
		});
		setFundOptions(funds);
		
		const indexesList = await dataRepository.getAllIndexList();
		var indexes = [];
		indexesList.forEach(index => {
			indexes.push({
				value: index,
				label: index
			});
		});
		setIndexOptions(indexes);
	}

	useEffect(() => {
		renderFirstData();
	}, []);

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
				<GrowthDirectCheckbox showGrowthDirect={showGrowthDirect} setShowGrowthDirect={setShowGrowthDirect} />
				{/* <SelectedFundsDisplay selectedFunds={selectedFunds} /> */}
				<ChartTypeSelector chartType={chartType} setChartType={setChartType} />
				<ValueTypeSelector valueType={valueType} setValueType={setValueType} />
				<RollingTypeSelector rollingType={rollingType} setRollingType={setRollingType} />
				<DurationSelector duration={duration} setDuration={setDuration} />
				<button onClick={() => {
					console.log(selectedMutualFunds);
				}}>
					{"click"}
				</button>
				<ChartPlaceholder />
			</div>
		</div>
	);
}

export default App;
