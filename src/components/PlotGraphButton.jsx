import React from "react";
import PLACEHOLDERS from "../common/placeholders";
import dataRepository from "../data/repository";

function PlotGraphButton({ chartData, setChartData, selectedMutualFunds, selectedIndexes }) {

    const handlePlotGraphButton = (event) => {
        selectedMutualFunds.forEach(fund => {
            dataRepository.getOneFundData(fund.value);
        });
        selectedIndexes.forEach(index => {
            console.log(index);
        });
    }

    return (
        <div className="flex justify-center mb-5">
            <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                onClick={handlePlotGraphButton}
            >
                {PLACEHOLDERS.home.plot_chart_button.label}
            </button>
        </div>
    );
}

export default PlotGraphButton; 