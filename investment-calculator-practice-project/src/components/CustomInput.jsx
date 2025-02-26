export default function CustomInput({
 name,
 type = "number",
 value,
 handleChange,
 children,
}) {
 return (
  <div>
   <label htmlFor={name}>{children}</label>
   <input type={type} name={name} value={value} onChange={handleChange} />
  </div>
 );
}
