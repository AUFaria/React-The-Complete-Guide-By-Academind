import "./styles.css";

import { useState } from "react";

import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept/CoreConcept";
import TabButton from "./components/TabButton/TabButton";

import { CORE_CONCEPTS, EXAMPLES } from "./data.js";

export default function App() {
  const [selectedTabButton, setSelectedTabButton] = useState();

  function handleTabButtonClicked(tabButtonLabel) {
    setSelectedTabButton(tabButtonLabel);
  }

  /*Conditional rendering: Variable-stored JSX*/
  let tabContent = <p>Please select an example.</p>;

  if (selectedTabButton) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTabButton].title}</h3>
        <p>{EXAMPLES[selectedTabButton].description}</p>
        <pre>{EXAMPLES[selectedTabButton].code}</pre>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* Dynamically outputting JSX content from an array */}
            {CORE_CONCEPTS.map((coreConcept) => (
              <CoreConcept key={coreConcept.title} {...coreConcept} />
            ))}

            {/* Spread operator prop assignment */}
            {/* <CoreConcept {...CORE_CONCEPTS[0]} /> */}

            {/*Individual prop assignment*/}
            {/* <CoreConcept
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
              image={CORE_CONCEPTS[1].image}
            />
            <CoreConcept
              title={CORE_CONCEPTS[2].title}
              description={CORE_CONCEPTS[2].description}
              image={CORE_CONCEPTS[2].image}
            />
            <CoreConcept
              title={CORE_CONCEPTS[3].title}
              description={CORE_CONCEPTS[3].description}
              image={CORE_CONCEPTS[3].image}
            /> */}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isActive={selectedTabButton === "components"}
              onTabButtonClicked={() => handleTabButtonClicked("components")}
            >
              Components
            </TabButton>
            <TabButton
              isActive={selectedTabButton === "jsx"}
              onTabButtonClicked={() => handleTabButtonClicked("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isActive={selectedTabButton === "props"}
              onTabButtonClicked={() => handleTabButtonClicked("props")}
            >
              Props
            </TabButton>
            <TabButton
              isActive={selectedTabButton === "state"}
              onTabButtonClicked={() => handleTabButtonClicked("state")}
            >
              State
            </TabButton>
          </menu>
          {/* Conditional rendering: Logical AND(&&) approach */}
          {/* {!selectedTabButton && <p>Please select an example.</p>}
          {selectedTabButton && (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTabButton].title}</h3>
              <p>{EXAMPLES[selectedTabButton].description}</p>
              <pre>{EXAMPLES[selectedTabButton].code}</pre>
            </div>
          )} */}

          {/* Conditional rendering: Ternary operator approach*/}
          {/* {!selectedTabButton ? (
            <p>Please select an example.</p>
          ) : (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTabButton].title}</h3>
              <p>{EXAMPLES[selectedTabButton].description}</p>
              <pre>{EXAMPLES[selectedTabButton].code}</pre>
            </div>
          )} */}

          {/*Conditional rendering: Variable-stored JSX*/}
          {tabContent}
        </section>
      </main>
    </div>
  );
}
