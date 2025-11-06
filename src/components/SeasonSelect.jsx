export default function SeasonSelect({ seasons, value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff" }}>
      {seasons.map((s, idx) => (
        <option key={idx} value={idx}>{`Season ${s.season}`}</option>
      ))}
    </select>
  );
}


