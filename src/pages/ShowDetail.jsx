import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../lib/api.jsx";
import { genres as ALL_GENRES } from "../constants/genres.jsx";
import { formatDate } from "../lib/format.jsx";
import Loading from "../components/Loading.jsx";
import ErrorNote from "../components/ErrorNote.jsx";
import GenreTag from "../components/GenreTag.jsx";
import SeasonSelect from "../components/SeasonSelect.jsx";
import SeasonList from "../components/SeasonList.jsx";

const wrap = { maxWidth: 1100, margin: "24px auto", padding: "0 16px" };
const headerCard = { 
  display: "grid", 
  gridTemplateColumns: "220px 1fr", 
  gap: 16, 
  background: "#fff", 
  border: "1px solid #eee", 
  borderRadius: 12, 
  padding: 16 
};

/**
 * Show detail page component displaying full show information, seasons, and episodes.
 * Fetches show data by ID from route parameters and handles loading, error, and empty states.
 * @returns {JSX.Element}
 */
export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seasonIdx, setSeasonIdx] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchShowById(id)
      .then((d) => {
        if (!active) return;
        setShow(d);
        setSeasonIdx(0);
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const genreNames = useMemo(() => (show?.genres || []).map((g) => ALL_GENRES.find((x) => x.id === g)?.title || g), [show]);

  return (
    <div className="showDetailContainer" style={wrap}>
      {loading && <Loading text="Loading show…" />}
      <ErrorNote message={error} />
      {!loading && !error && show && (
        <>
          <section className="detailHeader" style={headerCard}>
            <img className="detailHeaderImage" src={show.image} alt={show.title} style={{ width: 220, height: 220, borderRadius: 8, objectFit: "cover" }} />
            <div className="detailHeaderContent">
              <h1 style={{ marginTop: 0, fontSize: 30 }}>{show.title}</h1>
              <p style={{ color: "#374151" }}>{show.description}</p>
              <div style={{ marginBottom: 8 }}>
                {genreNames.map((g) => (
                  <GenreTag key={g}>{g}</GenreTag>
                ))}
              </div>
              <div className="detailHeaderStats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, color: "#4b5563" }}>
                <div>
                  <div style={{ fontSize: 12 }}>Total Seasons</div>
                  <div style={{ fontWeight: 600 }}>{show.seasons?.length || show.seasons}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12 }}>Last Updated</div>
                  <div style={{ fontWeight: 600 }}>{formatDate(show.updated)}</div>
                </div>
              </div>
            </div>
          </section>
          <style>{`
            @media (max-width: 768px) {
              .showDetailContainer {
                padding: 0 12px !important;
                margin: 16px auto !important;
              }
              .detailHeader {
                grid-template-columns: 1fr !important;
                justify-items: center;
                padding: 12px !important;
              }
              .detailHeaderImage {
                width: 100% !important;
                max-width: 300px;
                height: auto !important;
                aspect-ratio: 1;
                margin-bottom: 16px;
              }
              .detailHeaderContent {
                width: 100%;
                text-align: left;
              }
              .detailHeaderContent h1 {
                font-size: 22px !important;
                text-align: center;
                margin-bottom: 12px !important;
              }
              .detailHeaderContent p {
                text-align: left;
                font-size: 14px;
                line-height: 1.6;
              }
              .detailHeaderStats {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
                margin-top: 12px;
              }
              .seasonHeader {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 12px !important;
              }
              .seasonSelectWrapper {
                width: 100%;
              }
              .seasonSelectWrapper select {
                width: 100%;
                max-width: 100%;
              }
            }
            @media (max-width: 480px) {
              .detailHeaderImage {
                max-width: 100%;
              }
              .detailHeaderContent h1 {
                font-size: 20px !important;
              }
            }
          `}</style>

          {show.seasons && show.seasons.length > 0 ? (
            <>
              <h3 style={{ margin: "18px 0 8px" }}>Current Season</h3>
              <div className="seasonHeader" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div className="seasonInfo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: `url(${show.seasons?.[seasonIdx]?.image}) center/cover no-repeat` }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{show.seasons?.[seasonIdx]?.title}</div>
                    <small style={{ color: "#6b7280" }}>
                      {show.seasons?.[seasonIdx]?.episodes?.length || 0} Episodes • Released {show.seasons?.[seasonIdx]?.releaseDate ? new Date(show.seasons?.[seasonIdx]?.releaseDate).getFullYear() : "N/A"}
                    </small>
                  </div>
                </div>
                <div className="seasonSelectWrapper">
                  <SeasonSelect seasons={show.seasons} value={seasonIdx} onChange={setSeasonIdx} />
                </div>
              </div>
              <SeasonList season={show.seasons?.[seasonIdx]} />
            </>
          ) : (
            <div style={{ marginTop: 24, padding: 24, textAlign: "center", color: "#6b7280" }}>
              No seasons available for this show.
            </div>
          )}
        </>
      )}
    </div>
  );
}


