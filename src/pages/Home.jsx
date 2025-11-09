import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllShows } from "../lib/api.jsx";
import { genres as ALL_GENRES } from "../constants/genres.jsx";
import Loading from "../components/Loading.jsx";
import ErrorNote from "../components/ErrorNote.jsx";
import ShowCard from "../components/ShowCard.jsx";
import Pagination from "../components/Pagination.jsx";

const container = { maxWidth: 1200, margin: "24px auto", padding: "0 16px" };
const controls = { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" };
const input = { padding: "12px 14px", borderRadius: 12, border: "1px solid #e5e7eb", flex: 1, minWidth: 260 };
const select = { padding: "12px 14px", borderRadius: 12, border: "1px solid #e5e7eb", background: "#fff" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 };
const ITEMS_PER_PAGE = 10;

/**
 * Home page component displaying podcast shows with search, filters, and pagination.
 * @returns {JSX.Element}
 */
export default function Home() {
  const [params, setParams] = useSearchParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = params.get("q") || "";
  const genre = params.get("g") || "all";
  const sort = params.get("s") || "date-desc";
  const currentPage = Number(params.get("page")) || 1;

  const prevFiltersRef = useRef({ search, genre, sort });

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

  // Reset to page 1 when filters change
  useEffect(() => {
    const prev = prevFiltersRef.current;
    const filtersChanged =
      prev.search !== search || prev.genre !== genre || prev.sort !== sort;

    if (filtersChanged && params.get("page")) {
      const next = new URLSearchParams(params);
      next.delete("page");
      setParams(next, { replace: true });
    }

    prevFiltersRef.current = { search, genre, sort };
  }, [search, genre, sort, params, setParams]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedShows = filtered.slice(startIndex, endIndex);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  /**
   * Handle page change for pagination.
   * @param {number} page - Page number to navigate to (1-indexed)
   */
  const handlePageChange = (page) => {
    const next = new URLSearchParams(params);
    if (page === 1) {
      next.delete("page");
    } else {
      next.set("page", page.toString());
    }
    setParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="homeContainer" style={container}>
      <h2 className="homeTitle" style={{ marginBottom: 8, fontSize: 28 }}>Browse Podcasts</h2>
      <div className="homeControls" style={controls}>
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

      {!loading && !error && shows.length === 0 && (
        <p style={{ textAlign: "center", padding: "32px 0", color: "#6b7280" }}>
          No podcasts available.
        </p>
      )}

      {!loading && !error && shows.length > 0 && (
        <>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: "32px 0", color: "#6b7280" }}>
              No podcasts match your filters.
            </p>
          ) : (
            <>
              <div className="homeGrid" style={grid}>
                {paginatedShows.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
              <Pagination
                currentPage={validPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
      <style>{`
        @media (max-width: 768px) {
          .homeContainer {
            padding: 0 12px !important;
          }
          .homeTitle {
            font-size: 24px !important;
          }
          .homeControls {
            flex-direction: column;
          }
          .homeControls input,
          .homeControls select {
            width: 100%;
            min-width: 100%;
          }
          .homeGrid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .homeTitle {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}


