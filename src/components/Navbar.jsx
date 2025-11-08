import { Link, useLocation, useNavigate } from "react-router-dom";

const bar = { display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 10 };

/**
 * Top navigation bar with optional back button and prominent title.
 * Back button is hidden on the home route.
 * @returns {JSX.Element}
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <nav style={bar}>
      {!isHome && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          style={{ border: "1px solid #ddd", background: "#fff", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}
        >
          ←
        </button>
      )}
      <Link to="/" style={{ textDecoration: "none", color: "#111", fontWeight: 800, fontSize: 28, letterSpacing: 0.2 }}>
        Podcast Explorer
      </Link>
    </nav>
  );
}


