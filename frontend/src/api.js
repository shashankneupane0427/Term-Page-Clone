export async function fetchTerms(lang) {
  const res = await fetch(`http://localhost:4000/terms/${lang}`);
  if (!res.ok) throw new Error("Failed to fetch terms");
  return res.json();
}
