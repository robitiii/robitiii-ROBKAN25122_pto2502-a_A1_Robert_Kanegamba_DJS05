import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../lib/format.jsx";
import GenreTag from "./GenreTag.jsx";
import { genres as ALL_GENRES } from "../constants/genres.jsx";

/**
 * Large clickable card for a show used on the home grid.
 * @param {{show: any}} props
 */
export default function ShowCard({ show }) {
  const location = useLocation();
  const mapGenre = (id) => ALL_GENRES.find((g) => g.id === id)?.title || id;
  return (
    <Link
      to={{ pathname: `/show/${show.id}` }}
      state={{ from: location }}
      style={{
        display: "block",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 14,
        textDecoration: "none",
        color: "inherit",
        transition: "box-shadow .2s ease",
      }}
    >
      <img
        src={show.image}
        alt={show.title}
        style={{ width: "100%", height: 260, borderRadius: 12, objectFit: "cover" }}
      />
      <h3 style={{ margin: "10px 0 6px 0", fontSize: 20 }}>{show.title}</h3>
      <div style={{ marginBottom: 8 }}>
        {show.genres?.map((g) => (
          <GenreTag key={g}>{mapGenre(g)}</GenreTag>
        ))}
      </div>
      <small style={{ color: "#6b7280" }}>
        {show.seasons} seasons • Updated {formatDate(show.updated)}
      </small>
    </Link>
  );
}


