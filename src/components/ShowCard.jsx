import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../lib/format.jsx";
import GenreTag from "./GenreTag.jsx";
import { genres as ALL_GENRES } from "../constants/genres.jsx";

export default function ShowCard({ show }) {
  const location = useLocation();
  const mapGenre = (id) => ALL_GENRES.find((g) => g.id === id)?.title || id;
  return (
    <Link to={{ pathname: `/show/${show.id}` }} state={{ from: location }} style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 12, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 12, textDecoration: "none", color: "inherit" }}>
      <img src={show.image} alt={show.title} style={{ width: 96, height: 96, borderRadius: 8, objectFit: "cover" }} />
      <div>
        <h3 style={{ margin: "0 0 4px 0" }}>{show.title}</h3>
        <div style={{ marginBottom: 6 }}>
          {show.genres?.map((g) => (
            <GenreTag key={g}>{mapGenre(g)}</GenreTag>
          ))}
        </div>
        <small style={{ color: "#6b7280" }}>{show.seasons} seasons • Updated {formatDate(show.updated)}</small>
      </div>
    </Link>
  );
}


