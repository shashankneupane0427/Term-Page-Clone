import { useEffect, useState } from "react";
import { fetchTerms } from "./api";
import Navbar from "./Navbar";
import "./terms.css";

export default function Terms() {
  // Default to "sv" if no language is stored in localStorage
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "sv");
  const [termsData, setTermsData] = useState(null);

  useEffect(() => {
    // Persist language in localStorage
    localStorage.setItem("lang", lang);

    // Fetch terms for current language
    fetchTerms(lang)
      .then((data) => setTermsData(data))
      .catch((error) => console.error("Error fetching terms:", error));
  }, [lang]);

  // Close button handler
  const handleGoBack = () => {
    if (document.referrer) {
      // Go back if the user has a previous page
      window.history.back();
    } else {
      // Fallback to homepage
      window.location.href = "/";
    }
  };

  return (
    <main>
      <div className="terms-container">
        <div className="background-container">
          <img
            src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
            alt=""
            id="background-image"
          />
        </div>

        {termsData && (
          <>
            <Navbar
              lang={lang}
              setLang={setLang}
              navigation={termsData?.navigation}
            />

            <div className="content">
              <section className="terms-section">
                <div className="terms-top-text">
                  <h1 className="terms-heading">
                    {termsData?.terms?.terms || "Terms"}
                  </h1>
                  <button className="go-back-button" onClick={handleGoBack}>
                    {termsData?.terms?.close || "Close and Go Back"}
                  </button>
                </div>

                <div className="back-terms">
                  {Object.keys(termsData.terms)
                    .filter((key) => key.startsWith("terms_text"))
                    .sort()
                    .map((key) => (
                      <div
                        key={key}
                        className="terms-content"
                        dangerouslySetInnerHTML={{ __html: termsData.terms[key] }}
                      />
                    ))}
                </div>

                <div className="terms-top-text">
                  <button className="go-back-button lower-back-button" onClick={handleGoBack}>
                    {termsData?.terms?.close || "Close and Go Back"}
                  </button>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
