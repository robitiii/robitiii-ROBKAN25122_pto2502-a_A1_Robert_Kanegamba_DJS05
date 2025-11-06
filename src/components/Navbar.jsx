import { Link, useNavigate } from "react-router-dom";

const bar = { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 10 };

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={bar}>
      <button onClick={() => navigate(-1)} aria-label="Back" style={{ border: "1px solid #ddd", background: "#fff", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>←</button>
      <Link to="/" style={{ textDecoration: "none", color: "#111", fontWeight: 700 }}>PodcastApp</Link>
    </nav>
  );
}


