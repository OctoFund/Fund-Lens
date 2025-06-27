import Select from "react-select";
import { useEffect, useState } from "react";

function SearchInput({ options, selected, setSelected, label, placeholder }) {

  const fundOptions = [
    // { value: "HDFC Balanced Advantage Fund", label: "HDFC Balanced Advantage Fund" },
    // { value: "ICICI Prudential Bluechip Fund", label: "ICICI Prudential Bluechip Fund" }
  ];

  const [availableOptions, setAvailableOptions] = useState([]);

  useEffect(() => {
    const limited = options.slice(0, 5);
    setAvailableOptions(limited);
  }, [options]);

  const handleModifyFields = (searchString) => {
    const selectedCodes = new Set(selected.map(opt => opt.code || opt.value));

    const filtered = options
      .filter(opt =>
        (opt.name || opt.label).toLowerCase().includes(searchString) &&
        !selectedCodes.has(opt.code || opt.value)
      )
      .slice(0, 5);

    setAvailableOptions(filtered);
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Select
        isMulti
        options={availableOptions}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
        value={selected}
        onChange={setSelected}
        onInputChange={(inputValue, actionMeta) => {
          handleModifyFields(inputValue);
        }}
      />
    </div>
  );
}

export default SearchInput; 