const BASE_URL = "https://podcast-api.netlify.app";

export async function fetchAllShows() {
  const res = await fetch(`${BASE_URL}/shows`);
  if (!res.ok) throw new Error(`Failed to fetch shows (${res.status})`);
  return res.json();
}

export async function fetchShowById(id) {
  const res = await fetch(`${BASE_URL}/id/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch show ${id} (${res.status})`);
  return res.json();
}

export async function fetchShowsByGenre(id) {
  const res = await fetch(`${BASE_URL}/genre/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch genre ${id} (${res.status})`);
  return res.json();
}


