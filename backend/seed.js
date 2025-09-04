import fs from "fs";
import path from "path";
import Terms from "./models/Terms.js";

const __dirname = path.resolve();

const enTerms = JSON.parse(
  fs.readFileSync(path.join(__dirname, "terms_en.json"), "utf-8")
);
const svTerms = JSON.parse(
  fs.readFileSync(path.join(__dirname, "terms_sv.json"), "utf-8")
);

export const seedDefaultTerms = async () => {
  const defaultTerms = [
    { language: "en", content: enTerms },
    { language: "sv", content: svTerms },
  ];

  try {
    for (const term of defaultTerms) {
      const [record, created] = await Terms.upsert(term);
      if (created) {
        console.log(`Seeded default terms for language: ${term.language}`);
      } else {
        console.log(`Updated existing terms for language: ${term.language}`);
      }
    }
  } catch (err) {
    console.error("Error seeding default terms:", err);
  }
};
