import { useState } from "react";
import { styled } from "styled-components";
import "./AuthInputs.css";

import CustomButton from "../CustomButton";
import CustomControl from "../CustomControl";

/*
    NOTE: Styled Components and Tagged Templates

    Kind of an unusual syntax, but here's what I've figured out so far:
    ex:
        someFunction`Some ${arg1} string ${arg2} value.`

    someFunction is a user defined function like normal, but instead of
    calling it with `someFunction(arg1, arg2)`, the arguments are passed with
    string interpolation inside a template literal. This is a native JavaScript
    functionality.
    
    When used in the context of Styled Components, the template literal argument
    is used to supply CSS styles to the component created with `styled` (The import
    above, can be whatever name) which is a JavaScript object and acessing one
    of its properties which are HTML elements (i.e `styled.div` creates a <div> element).
*/

const ControlContainer = styled.div`
 display: flex;
 flex-direction: column;
 gap: 0.5rem;
 margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
 const [enteredEmail, setEnteredEmail] = useState("");
 const [enteredPassword, setEnteredPassword] = useState("");
 const [submitted, setSubmitted] = useState(false);

 function handleInputChange(identifier, value) {
  if (identifier === "email") {
   setEnteredEmail(value);
  } else {
   setEnteredPassword(value);
  }
 }

 function handleLogin() {
  setSubmitted(true);
 }

 const emailNotValid = submitted && !enteredEmail.includes("@");
 const passwordNotValid = submitted && enteredPassword.trim().length < 6;

 return (
  <div id="auth-inputs">
   <ControlContainer>
    <CustomControl
     labelText="Email"
     invalid={emailNotValid}
     type="email"
     onChange={(event) =>
      handleInputChange("email", event.target.value)
     }></CustomControl>
    <CustomControl
     labelText="Password"
     invalid={passwordNotValid}
     type="password"
     onChange={(event) =>
      handleInputChange("password", event.target.value)
     }></CustomControl>
   </ControlContainer>
   <div className="actions">
    <button type="button" className="text-button">
     Create a new account
    </button>
    <CustomButton onClick={handleLogin}>Sign In</CustomButton>
   </div>
  </div>
 );

 //  return (
 //   <div id="auth-inputs">
 //    {/* <div className="controls"> */}
 //    <ControlContainer>
 //     <p>
 //      {/* <CustomLabel className={`label ${emailNotValid ? "invalid" : ""}`}> */}
 //      <CustomLabel $invalid={emailNotValid}>Email</CustomLabel>
 //      <CustomInput
 //       type="email"
 //       // style={{
 //       //  backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db",
 //       // }}
 //       //   className={emailNotValid ? "invalid" : undefined}
 //       $invalid={emailNotValid}
 //       onChange={(event) => handleInputChange("email", event.target.value)}
 //      />
 //     </p>
 //     <p>
 //      <CustomLabel $invalid={passwordNotValid}>Password</CustomLabel>
 //      <CustomInput
 //       type="password"
 //       $invalid={passwordNotValid}
 //       onChange={(event) => handleInputChange("password", event.target.value)}
 //      />
 //     </p>
 //    </ControlContainer>
 //    {/* </div> */}
 //    <div className="actions">
 //     <button type="button" className="text-button">
 //      Create a new account
 //     </button>
 //     <CustomButton onClick={handleLogin}>Sign In</CustomButton>
 //    </div>
 //   </div>
 //  );
}
