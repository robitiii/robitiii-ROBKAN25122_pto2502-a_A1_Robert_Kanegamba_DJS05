import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllShows } from "../lib/api.jsx";
import { genres as ALL_GENRES } from "../constants/genres.jsx";
import Loading from "../components/Loading.jsx";
import ErrorNote from "../components/ErrorNote.jsx";
import ShowCard from "../components/ShowCard.jsx";

const container = { maxWidth: 1100, margin: "24px auto", padding: "0 16px" };
const controls = { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 };
const input = { padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", flex: 1, minWidth: 220 };
const select = { padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 };

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = params.get("q") || "";
  const genre = params.get("g") || "all";
  const sort = params.get("s") || "date-desc";

  useEffect(() => {
    let active = true;
    fetchAllShows()
      .then((d) => active && setShows(d))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    let data = [...shows];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((s) => s.title.toLowerCase().includes(q));
    }
    if (genre !== "all") {
      data = data.filter((s) => s.genres.includes(Number(genre)));
    }
    switch (sort) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
      default:
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
    }
    return data;
  }, [shows, search, genre, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 8 }}>Browse Podcasts</h2>
      <div style={controls}>
        <input type="search" placeholder="Search shows…" defaultValue={search} onChange={(e) => setParam("q", e.target.value)} style={input} />
        <select value={genre} onChange={(e) => setParam("g", e.target.value)} style={select}>
          <option value="all">All Genres</option>
          {ALL_GENRES.map((g) => (
            <option key={g.id} value={g.id}>{g.title}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setParam("s", e.target.value)} style={select}>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
        </select>
      </div>

      {loading && <Loading text="Loading podcasts…" />}
      <ErrorNote message={error} />

      {!loading && !error && (
        <div style={grid}>
          {filtered.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p>No podcasts match your filters.</p>
      )}
    </div>
  );
}


