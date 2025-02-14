export default function TabButton({ children, onTabButtonClicked, isActive }) {
  return (
    <li>
      <button className={isActive ? "active" : ""} onClick={onTabButtonClicked}>
        {children}
      </button>
    </li>
  );
}
