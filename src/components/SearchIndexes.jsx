import Select from "react-select";
import { useState } from "react";
import PLACEHOLDERS from "../common/placeholders";

function SearchIndexes({ search, setSearch }) {
  const fundOptions = [
    { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
    { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  ];
  const [selectedFunds, setSelectedFunds] = useState([]);

  return (
    <SearchInput 

    />
  );
}

export default SearchIndexes; 