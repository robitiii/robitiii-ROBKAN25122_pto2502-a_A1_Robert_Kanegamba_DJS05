import EpisodeCard from "./EpisodeCard.jsx";

/**
 * Displays a list of episodes for a season.
 * Shows an empty state message if the season has no episodes.
 * @param {Object} props
 * @param {Object|null} props.season - Season object with episodes array
 */
export default function SeasonList({ season }) {
  if (!season) return null;
  
  const episodes = season.episodes || [];
  
  if (episodes.length === 0) {
    return (
      <div style={{ marginTop: 12, padding: 24, textAlign: "center", color: "#6b7280" }}>
        No episodes available for this season.
      </div>
    );
  }
  
  return (
    <div style={{ marginTop: 12 }}>
      {episodes.map((ep) => (
        <EpisodeCard key={ep.episode} episode={ep} seasonImage={season.image} />
      ))}
    </div>
  );
}


