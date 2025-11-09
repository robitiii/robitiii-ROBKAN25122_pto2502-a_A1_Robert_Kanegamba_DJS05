import { truncate } from "../lib/format.jsx";

/**
 * Card component displaying a single episode with image, number, title, and description.
 * @param {Object} props
 * @param {Object} props.episode - Episode object with episode number, title, and description
 * @param {string} props.seasonImage - URL of the season image to display
 */
export default function EpisodeCard({ episode, seasonImage }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 12, marginBottom: 10 }}>
      <div style={{ width: 56, height: 56, borderRadius: 8, background: `url(${seasonImage}) center/cover no-repeat` }} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600 }}>E{episode.episode}</span>
          <h4 style={{ margin: 0 }}>{episode.title}</h4>
        </div>
        <p style={{ margin: "6px 0 0 0", color: "#4b5563" }}>{truncate(episode.description, 200)}</p>
      </div>
    </div>
  );
}


