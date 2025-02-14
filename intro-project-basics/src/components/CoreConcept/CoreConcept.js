import "./CoreConcept.css";

// Passing 'props' as a single object argument
// export default function CoreConcept(props) {
//   return (
//     <li>
//       <img src={props.image} alt={props.title} />
//       <h1>{props.title}</h1>
//       <p>{props.description}</p>
//     </li>
//   );
// }

// Passing 'props' as a destructuring argument
export default function CoreConcept({ title, description, image }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </li>
  );
}
