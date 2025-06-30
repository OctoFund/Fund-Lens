import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function ChartPlaceholder({ data, maxLines = 5 }) {
	const limitedData = {
		...data,
		datasets: data.datasets.slice(0, maxLines)
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Mutual Fund Performance (3 Years)',
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Trading Days'
				}
			},
			y: {
				beginAtZero: false,
				title: {
					display: true,
					text: 'NAV Value (₹)'
				}
			},
		},
	};

	return (
		<div className="w-full h-[500px] bg-white rounded p-4">
			<Line data={limitedData} options={options} />
		</div>
	);
}

// Generate 3 years of daily data (excluding weekends)
function generateChartData() {
	const startDate = new Date('2021-01-01');
	const endDate = new Date('2024-01-01');
	const labels = [];
	const fundAData = [];
	const fundBData = [];
	const fundCData = [];
	const fundDData = [];
	const fundEData = [];

	let currentDate = new Date(startDate);
	let dayCount = 0;

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay();

		// Skip weekends (Saturday = 6, Sunday = 0)
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			// Format date for labels
			const dateStr = currentDate.toLocaleDateString('en-US', {
				month: 'short',
				year: '2-digit'
			});
			labels.push(dateStr);

			// Generate realistic NAV values with some volatility
			const baseValueA = 100 + (dayCount * 0.05) + (Math.random() - 0.5) * 2;
			const baseValueB = 150 + (dayCount * 0.03) + (Math.random() - 0.5) * 1.5;
			const baseValueC = 200 + (dayCount * 0.04) + (Math.random() - 0.5) * 3;
			const baseValueD = 80 + (dayCount * 0.06) + (Math.random() - 0.5) * 2.5;
			const baseValueE = 120 + (dayCount * 0.02) + (Math.random() - 0.5) * 1.8;

			fundAData.push(parseFloat(baseValueA.toFixed(2)));
			fundBData.push(parseFloat(baseValueB.toFixed(2)));
			fundCData.push(parseFloat(baseValueC.toFixed(2)));
			fundDData.push(parseFloat(baseValueD.toFixed(2)));
			fundEData.push(parseFloat(baseValueE.toFixed(2)));

			dayCount++;
		}

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return {
		labels,
		datasets: [
			{
				label: 'HDFC Balanced Advantage Fund',
				data: fundAData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.1)',
				tension: 0.1,
				pointRadius: 0,
				pointHoverRadius: 4
			},
			{
				label: 'ICICI Prudential Bluechip Fund',
				data: fundBData,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.1)',
				tension: 0.1,
				pointRadius: 0,
				pointHoverRadius: 4
			},
			{
				label: 'Axis Bluechip Fund',
				data: fundCData,
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.1)',
				tension: 0.1,
				pointRadius: 0,
				pointHoverRadius: 4
			},
			{
				label: 'SBI Bluechip Fund',
				data: fundDData,
				borderColor: 'rgb(255, 159, 64)',
				backgroundColor: 'rgba(255, 159, 64, 0.1)',
				tension: 0.1,
				pointRadius: 0,
				pointHoverRadius: 4
			},
			{
				label: 'Kotak Emerging Equity Fund',
				data: fundEData,
				borderColor: 'rgb(153, 102, 255)',
				backgroundColor: 'rgba(153, 102, 255, 0.1)',
				tension: 0.1,
				pointRadius: 0,
				pointHoverRadius: 4
			}
		]
	};
}

export default ChartPlaceholder;
export { generateChartData };