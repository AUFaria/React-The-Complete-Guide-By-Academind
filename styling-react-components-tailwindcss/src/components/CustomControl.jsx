// import { styled } from "styled-components";

// const CustomLabel = styled.label`
//  display: block;
//  margin-bottom: 0.5rem;
//  font-size: 0.75rem;
//  font-weight: 700;
//  letter-spacing: 0.1em;
//  text-transform: uppercase;
//  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
// `;

// const CustomInput = styled.input`
//  width: 100%;
//  padding: 0.75rem 1rem;
//  line-height: 1.5;
//  border: 1px solid transparent;
//  background-color: ${({ $invalid }) => ($invalid ? "#fed2d2" : "#d1d5db")};
//  color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#374151")};
//  border-color: ${({ $invalid }) => ($invalid ? "#f73f3f" : "transparent")};
//  border-radius: 0.25rem;
//  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `;

// export default function CustomControl({ labelText, invalid, ...props }) {
//  return (
//   <p>
//    <CustomLabel $invalid={invalid}>{labelText}</CustomLabel>
//    <CustomInput $invalid={invalid} {...props} />
//   </p>
//  );
// }

export default function CustomControl({ labelText, invalid, ...props }) {
 let labelStyleClasses = "block mb-2 text-xs font-bold tracking-wide uppercase";
 let inputStyleClasses = "w-full px-3 py-2 leading-tight border rounded shadow";

 if (invalid) {
  labelStyleClasses += " text-red-400";
  inputStyleClasses += " text-red-500 bg-red-100 border-red-300";
 } else {
  labelStyleClasses += " text-stone-300";
  inputStyleClasses += " text-gray-700 bg-stone-300";
 }

 return (
  <p>
   <label className={labelStyleClasses}>{labelText}</label>
   <input className={inputStyleClasses} {...props} />
  </p>
 );
}
