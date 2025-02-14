import "./styles.css";

import Header from "./components/Header/Header";
import CoreConceptsWrapper from "./components/CoreConceptsWrapper/CoreConceptsWrapper";
import Examples from "./components/Examples/Examples";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConceptsWrapper />
        <Examples />
      </main>
    </>
  );
}
