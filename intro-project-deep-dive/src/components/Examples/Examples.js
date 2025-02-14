import { useState } from "react";

import Section from "../Section/Section";
import Tabs from "../Tabs/Tabs";
import TabButton from "../TabButton/TabButton";

import { EXAMPLES } from "../../data";

export default function Examples() {
  const [selectedTabButton, setSelectedTabButton] = useState();

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

  function handleTabButtonClicked(tabButtonLabel) {
    setSelectedTabButton(tabButtonLabel);
  }

  return (
    <Section title="Examples" id="examples">
      {/* ElementsContainer="menu" */}
      <Tabs
        elements={
          <>
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
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
