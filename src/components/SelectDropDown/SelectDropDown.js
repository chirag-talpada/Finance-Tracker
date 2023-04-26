import React from "react";

const SelectDropDown = ({name,selectName,optionValue,handler}) => {
  return (
    <select name={name} defaultValue="" className="form-input" onChange={handler}>
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
