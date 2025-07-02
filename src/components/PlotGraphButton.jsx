import React, { useEffect } from "react";
import PLACEHOLDERS from "../common/placeholders";
import dataRepository from "../data/repository";

const constructNavOrIndexData = async (selectedMutualFunds, selectedIndexes, setChartData, setLoader) => {
    setLoader(true);
    var rawChartData = {
        "mf": {},
        "index":{}
    };
    for (let i = 0; i < selectedMutualFunds.length; i++) {
        const fund = selectedMutualFunds[i];
        const data = await dataRepository.getOneFundData(fund.value);
        rawChartData["mf"][fund.label] = data;
    }
    for (let i = 0; i < selectedIndexes.length; i++) {
        const index = selectedIndexes[i];
        const data = await dataRepository.getOneIndexData(index.value);
        rawChartData["index"][index.value] = data;
    }
    setChartData(rawChartData);
    setLoader(false);
}

function PlotGraphButton({ 
    chartData, 
    setChartData, 
    chartType, 
    selectedMutualFunds, 
    selectedIndexes,
    setLoader
}) {

    const handlePlotGraphButton = async () => {
        setLoader(true);
        switch (chartType) {
            case 1:
                constructNavOrIndexData(selectedMutualFunds, selectedIndexes, setChartData, setLoader);
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
                
                break;
            case 6:
                
                break;
            default:
                setLoader(false);
                throw new Error("Invalid Analysis Type Selected");
                break;
        }
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