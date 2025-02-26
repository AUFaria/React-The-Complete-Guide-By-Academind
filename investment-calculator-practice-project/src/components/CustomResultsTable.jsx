import { calculateInvestmentResults, formatter } from "../util/investment";

export default function CustomResultsTable({ investmentData }) {

 // Helper function in order to calculate invested capital
 // values of `initialInvestment` and `annualInvestment` do not change
 // regardless of the year
 function getInvestedCapital(year) {
  return (
   investmentData.initialInvestment + year * investmentData.annualInvestment
  );
 }

 return (
  <table id="result">
   <thead>
    <tr>
     <th>Year</th>
     <th>Investment Value</th>
     <th>Interest (Year)</th>
     <th>Total Interest</th>
     <th>Invested Capital</th>
    </tr>
   </thead>

   {/*
        NOTE: Since `investmentData` is passed from a parent component as a prop,
        and the `investmentData` object is managed as a state, whenever it is updated
        in the parent component, util method calculateInvestmentResults will be called
        again since the page is re-rendered. The default return is an empty array, should
        any properties of the `investmentData` object be undefined.
   */}
   <tbody>
    {calculateInvestmentResults(investmentData).map((result) => {
     return (
      <tr key={result.year}>
       <td>{result.year}</td>
       <td>{formatter.format(result.valueEndOfYear)}</td>
       <td>{formatter.format(result.interest)}</td>
       <td>
        {formatter.format(
         result.valueEndOfYear - getInvestedCapital(result.year)
        )}
       </td>
       <td>{formatter.format(getInvestedCapital(result.year))}</td>
      </tr>
     );
    })}
   </tbody>
  </table>
 );
}