import EpisodeCard from "./EpisodeCard.jsx";

export default function SeasonList({ season }) {
  if (!season) return null;
  return (
    <div style={{ marginTop: 12 }}>
      {season.episodes?.map((ep) => (
        <EpisodeCard key={ep.episode} episode={ep} seasonImage={season.image} />
      ))}
    </div>
  );
}


