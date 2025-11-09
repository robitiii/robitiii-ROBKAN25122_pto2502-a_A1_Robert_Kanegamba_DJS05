/**
 * Dropdown selector for choosing a season.
 * @param {Object} props
 * @param {Array} props.seasons - Array of season objects
 * @param {number} props.value - Current selected season index
 * @param {Function} props.onChange - Callback when season changes (receives season index)
 */
export default function SeasonSelect({ seasons, value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff" }}>
      {seasons.map((s, idx) => (
        <option key={idx} value={idx}>{`Season ${s.season}`}</option>
      ))}
    </select>
  );
}


