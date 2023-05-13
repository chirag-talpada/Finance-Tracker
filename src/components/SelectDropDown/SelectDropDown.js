/* eslint-disable no-unreachable */
import React from "react";

const SelectDropDown = ({
  defaultValue,
  register,
  name,
  selectName,
  cssClass,
  optionValue,
  handler,
  type,
}) => {

  
  

  switch (type) {
    case 1:
      return (
      
        
        <select
          {...(register && { ...register(name) })}
          defaultValue={defaultValue}
          className="form-input"
        >
          <option value="" disabled>
            Select {selectName}
          </option>
          {optionValue.map((data, i) => {
            return (
              <option key={i} value={data}>
                {data}
              </option>
            );
          })}
        </select>
        
      );
      break;
    case 2:
      return (
        <select
          defaultValue={"none"}
          name={name}
          className={cssClass}
          onChange={handler}
        >
          <option value="none">none</option>
          {optionValue.map((data, i) => {
            return (
              <option key={i} value={data}>
                {data}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
  }
};

export default SelectDropDown;
