export default function Button({
  children,
  theme,
  styles,
  type,
  onClick = () => {},
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      style={{
        gap: 8,
        border: "none",
        fontSize: 24,
        padding: ".5em",
        borderRadius: 8,
        display: "flex",
        cursor: "pointer",
        color: "var(--white)",
        background: theme === "primary" ? "var(--primary-color)" : theme,
        ...styles,
      }}
    >
      {children}
    </button>
  );
}
