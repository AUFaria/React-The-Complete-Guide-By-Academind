import CoreConcept from "../CoreConcept/CoreConcept";

import { CORE_CONCEPTS } from "../../data";

export default function CoreConceptsWrapper() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((coreConcept) => (
          <CoreConcept key={coreConcept.title} {...coreConcept} />
        ))}
      </ul>
    </section>
  );
}
