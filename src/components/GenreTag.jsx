/**
 * Styled tag component for displaying genre labels.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Genre name to display
 */
export default function GenreTag({ children }) {
  return (
    <span style={{ display: "inline-block", padding: "4px 8px", background: "#f3f4f6", color: "#111", borderRadius: 999, fontSize: 12, marginRight: 6 }}>
      {children}
    </span>
  );
}


