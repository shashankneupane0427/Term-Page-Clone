export async function fetchTerms(lang) {
  const baseUrl = import.meta.env.VITE_API_URL; // for Vite
  // const baseUrl = process.env.REACT_APP_API_URL; // for CRA
  const res = await fetch(`${baseUrl}/terms/${lang}`);
  if (!res.ok) throw new Error("Failed to fetch terms");
  return res.json();
}
