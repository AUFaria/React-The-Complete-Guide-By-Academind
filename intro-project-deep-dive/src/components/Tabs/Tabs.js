export default function Tabs({
  children,
  elements,
  ElementsContainer = "menu",
}) {
  // const ElementsContainer = elementsContainer;

  return (
    <>
      <ElementsContainer>{elements}</ElementsContainer>
      {children}
    </>
  );
}
