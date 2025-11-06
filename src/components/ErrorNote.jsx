export default function ErrorNote({ message }) {
  if (!message) return null;
  return (
    <div style={{ background: "#fff2f2", border: "1px solid #f5c2c7", color: "#842029", padding: 16, borderRadius: 12, margin: "16px 0" }}>
      {message}
    </div>
  );
}


