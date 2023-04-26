import React from "react";

const SelectDropDown = ({name,selectName,optionValue,handler,defaultDDLValue}) => {
  return (
    <select value={defaultDDLValue} name={name} className="form-input" onChange={handler}>
      <option value="" disabled>
        Select {selectName}
      </option>
      {optionValue.map((data,i) => {
        return <option key={i} value={data}>{data}</option>;
      })}
    </select>
  );
};

export default SelectDropDown;
