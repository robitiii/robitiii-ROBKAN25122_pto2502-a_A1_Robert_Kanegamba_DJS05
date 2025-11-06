export default function Loading({ text = "Loading…" }) {
  return (
    <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ width: 16, height: 16, borderRadius: 999, border: "2px solid #ddd", borderTopColor: "#111", animation: "spin 1s linear infinite" }} />
      <p style={{ margin: 0 }}>{text}</p>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}


