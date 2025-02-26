import { useState } from "react";

import CustomHeader from "./components/CustomHeader";
import CustomInput from "./components/CustomInput";
import CustomResultsTable from "./components/CustomResultsTable";

// Default object storing initial data for `investmentData` state
const INVESTMENT_DATA_INITIAL_STATE = {
 initialInvestment: undefined,
 annualInvestment: undefined,
 expectedReturn: undefined,
 duration: undefined,
};

// Default object storing labels for each property of the `investmentData` state
const INVESTMENT_DATA_LABEL_MAP = {
 initialInvestment: "Initial Investment",
 annualInvestment: "Annual Investment",
 expectedReturn: "Expected Return",
 duration: "Duration",
};

function App() {
 // State management of an object instead of individual, separate states
 // for each property of the `investmentData` object
 const [investmentData, setInvestmentData] = useState(
  INVESTMENT_DATA_INITIAL_STATE
 );

 // Function to handle the `onChange` event of the <input> elements
 // and update state of `investmentData` object
 // NOTE: `parseInt` had to be used as the return of `event.target.value` is a string
 function handleInputChange(key, event) {
  const investmentDataCopy = { ...investmentData };
  investmentDataCopy[key] = parseInt(event.target.value);
  setInvestmentData(investmentDataCopy);
 }

 return (
  <>
   <CustomHeader />
   {/*
        Somewhat of an unorthodox approach, but mainly used here to showcase
        how to dynamically render multiple components by iterating an array.

        Each component get its own key and props based on the properties of the
        `investmentData` object.
        * `handleChange` is an anonymous function that captures the `onChange` event
           of a HTML <input> element (defined inside CustomInput component), updating 
           the associated property of the `investmentData` object.
        * `INVESTMENT_DATA_LABEL_MAP[key]` could instead be defined as a prop on the 
           component (i.e `{ ..., label, ...`), but again, was used this way to showcase 
           both dynamic rendering and the usage of `children` prop.  
   */}
   <div id="user-input">
    <div className="custom-input-group">
     {Object.keys(investmentData).map((key) => (
      <CustomInput
       key={key}
       name={`${key}Input`}
       value={investmentData[key]}
       handleChange={(event) => handleInputChange(key, event)}>
       {INVESTMENT_DATA_LABEL_MAP[key]}
      </CustomInput>
     ))}
    </div>
   </div>

   {/*
        Ternary operator approach on conditional rendering of components.
        Instructor's challenge included displaying an error message if
        the value of `duration` was lower than zero.
   */}
   {investmentData.duration < 0 ? (
    <p className="center">Please select a "Duration" value higher than zero!</p>
   ) : (
    <CustomResultsTable investmentData={investmentData} />
   )}
  </>
 );
}

export default App;
