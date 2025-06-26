import { useEffect, useState } from "react";
import PROPERTIES from "./common/home/properties";
import networkModule from "./network/module";
import HTTPRequestTypes from "./network/HTTPRequestTypes";

function App() {
	const [search, setSearch] = useState("");
	const [showGrowthDirect, setShowGrowthDirect] = useState(true);
	const [selectedFunds, setSelectedFunds] = useState([]);
	const [chartType, setChartType] = useState("");
	const [valueType, setValueType] = useState("NAV");
	const [rollingType, setRollingType] = useState("");
	const [duration, setDuration] = useState("1Y");

	async function renderFirstData() {
		const res = await networkModule.request(HTTPRequestTypes.GET, "https://api.mfapi.in/mf");
		console.log(res);
	}

	useEffect(() => {
		renderFirstData();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
			<div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
				<h1 className="text-2xl font-bold mb-2 text-center">Mutual Funds Analysis</h1>
				<p className="text-center text-gray-500 mb-6">India's Free and Open source mutual funds analysis tool.</p>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Mutual Fund Index (TRI)</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
						placeholder="Start typing the mutual fund name"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex items-center mb-4">
					<input
						id="growth-direct"
						type="checkbox"
						checked={showGrowthDirect}
						onChange={() => setShowGrowthDirect(v => !v)}
						className="mr-2"
					/>
					<label htmlFor="growth-direct" className="text-sm">Show Growth Direct funds only (ignoring other like dividends and regular plans)</label>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Selected Funds</label>
					<div className="border border-gray-300 rounded px-3 py-2 bg-gray-100 min-h-[40px]">(Selected funds will appear here)</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Type of chart</label>
					<select
						className="w-full border border-gray-300 rounded px-3 py-2"
						value={chartType}
						onChange={e => setChartType(e.target.value)}
					>
						<option value="">Select chart type</option>
						<option value="line">Line</option>
						<option value="bar">Bar</option>
						<option value="area">Area</option>
					</select>
					<a href="#" className="text-xs text-blue-600 underline mt-1 inline-block">Click here to understand these charts</a>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">NAV or Index Value</label>
					<select
						className="w-full border border-gray-300 rounded px-3 py-2"
						value={valueType}
						onChange={e => setValueType(e.target.value)}
					>
						<option value="NAV">NAV</option>
						<option value="Index">Index Value</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1">Rolling Returns / Value</label>
					<select
						className="w-full border border-gray-300 rounded px-3 py-2"
						value={rollingType}
						onChange={e => setRollingType(e.target.value)}
					>
						<option value="">Select type</option>
						<option value="sip-xirr">Sip Rolling Returns (XIRR %)</option>
						<option value="sip-abs">Sip Rolling Absolute Value (₹)</option>
						<option value="lumpsum-cagr">Lumpsum Rolling Returns (CAGR %)</option>
						<option value="lumpsum-abs">Lumpsum Rolling Absolute Value (₹)</option>
						<option value="stddev">Standard Deviation Rolling Annualized Monthly (Risk) (%)</option>
					</select>
				</div>
				<div className="mb-6">
					<label className="block text-sm font-medium mb-1">Investment duration</label>
					<div className="flex gap-2">
						<button
							className={`px-3 py-1 rounded border ${duration === "1Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
							onClick={() => setDuration("1Y")}
						>1 Year</button>
						<button
							className={`px-3 py-1 rounded border ${duration === "3Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
							onClick={() => setDuration("3Y")}
						>3 Years</button>
						<button
							className={`px-3 py-1 rounded border ${duration === "5Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
							onClick={() => setDuration("5Y")}
						>5 Years</button>
						<button
							className={`px-3 py-1 rounded border ${duration === "10Y" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
							onClick={() => setDuration("10Y")}
						>10 Years</button>
					</div>
				</div>
				<div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-400">
					chart
				</div>
			</div>
		</div>
	);
}

export default App;
