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

function App() {
	document.title = PLACEHOLDERS.home.title;
	const [search, setSearch] = useState("");
	const [showGrowthDirect, setShowGrowthDirect] = useState(true);
	const [selectedFunds, setSelectedFunds] = useState([]);
	const [chartType, setChartType] = useState("");
	const [valueType, setValueType] = useState("NAV");
	const [rollingType, setRollingType] = useState("");
	const [duration, setDuration] = useState("1Y");

	async function renderFirstData() {
		const fundsList = await dataRepository.getAllFundsList();
		console.log(fundsList);
	}

	useEffect(() => {
		renderFirstData();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
			<div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
				<Header />
				<SearchInput search={search} setSearch={setSearch} />
				<GrowthDirectCheckbox showGrowthDirect={showGrowthDirect} setShowGrowthDirect={setShowGrowthDirect} />
				<SelectedFundsDisplay selectedFunds={selectedFunds} />
				<ChartTypeSelector chartType={chartType} setChartType={setChartType} />
				<ValueTypeSelector valueType={valueType} setValueType={setValueType} />
				<RollingTypeSelector rollingType={rollingType} setRollingType={setRollingType} />
				<DurationSelector duration={duration} setDuration={setDuration} />
				<ChartPlaceholder />
			</div>
		</div>
	);
}

export default App;
