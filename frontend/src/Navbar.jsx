import React, { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = ({ lang, setLang, navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1266);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLangOpen) setIsLangOpen(false);
  };

  const toggleLang = () => {
    setIsLangOpen(!isLangOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const selectLanguage = (selectedLang) => {
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".navigation-menu-bar") &&
        !event.target.closest(".lang-dropk")
      ) {
        setIsMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1266);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nav = navigation || {
    home: "Home",
    order: "Order",
    our_customer: "Our Customers",
    about_us: "About us",
    contact_us: "Contact Us",
  };

  return (
    <nav className="navigation-out">
      <header className="navigation-header">
        <section className="navigation-section">
          <div className="logoa">
            <a href="/">
              <img
                alt="123 Fakturera"
                className="navigation-logo"
                src="https://storage.123fakturera.se/public/icons/diamond.png"
              />
            </a>
          </div>

          <div className="open-menu-dds" onClick={toggleMenu}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="navigation-svg"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </div>

          <div className="navigation-menu-bar">
            {/* Mobile Menu */}
            <div
              className="menu-drop-down"
              style={{
                height: isMenuOpen ? "auto" : "0px",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <div className="menu-drop-down-container">
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">{nav.home}</p>
                </a>
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">{nav.order}</p>
                </a>
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">{nav.our_customer}</p>
                </a>
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">{nav.about_us}</p>
                </a>
                <a className="menu-drop-down-item" href="/">
                  <p className="menu-item-name">{nav.contact_us}</p>
                </a>
              </div>
            </div>

            {/* PC Menu */}
            <div className="pc-menu">
              <a className="pc-menu-items" href="/">
                <p className="collectionitem">{nav.home}</p>
              </a>
              <a className="pc-menu-items" href="/">
                <p className="collectionitem">{nav.order}</p>
              </a>
              <a className="pc-menu-items" href="/">
                <p className="collectionitem">{nav.our_customer}</p>
              </a>
              <a className="pc-menu-items" href="/">
                <p className="collectionitem">{nav.about_us}</p>
              </a>
              <a className="pc-menu-items" href="/">
                <p className="collectionitem">{nav.contact_us}</p>
              </a>

              {/* PC Language Menu (only if desktop) */}
              {isDesktop && (
                <a
                  className="pc-menu-items language-pc-menu-items"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLang();
                  }}
                >
                  <div className="language-box">
                    <p className="flag-name collectionitem">
                      {lang === "en" ? "English" : "Svenska"}
                    </p>
                    <img
                      src={
                        lang === "en"
                          ? "https://storage.123fakturere.no/public/flags/GB.png"
                          : "https://storage.123fakturere.no/public/flags/SE.png"
                      }
                      className="icon-flag-nav"
                      alt={lang === "en" ? "English" : "Svenska"}
                    />
                  </div>

                  <div
                    className="dropdownList"
                    style={{ display: isLangOpen ? "block" : "none" }}
                  >
                    <div
                      className="language-Svenska drop-down-element"
                      onClick={() => selectLanguage("sv")}
                    >
                      <div className="drop-down-lang-name">Svenska</div>
                      <img
                        src="https://storage.123fakturere.no/public/flags/SE.png"
                        className="drop-down-image"
                        alt="Svenska"
                      />
                    </div>
                    <div
                      className="language-English drop-down-element"
                      onClick={() => selectLanguage("en")}
                    >
                      <div className="drop-down-lang-name">English</div>
                      <img
                        src="https://storage.123fakturere.no/public/flags/GB.png"
                        className="drop-down-image"
                        alt="English"
                      />
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Language Dropdown (only if not desktop) */}
          {!isDesktop && (
            <div className="lang-dropk">
              <div>
                <div className="dropdownContainer" onClick={toggleLang}>
                  <div className="language-box">
                    <p className="flag-name collectionitem">
                      {lang === "en" ? "English" : "Svenska"}
                    </p>
                    <img
                      src={
                        lang === "en"
                          ? "https://storage.123fakturere.no/public/flags/GB.png"
                          : "https://storage.123fakturere.no/public/flags/SE.png"
                      }
                      className="icon-flag-nav"
                      alt={lang === "en" ? "English" : "Svenska"}
                    />
                  </div>
                </div>

                <div
                  className="dropdownList"
                  style={{ display: isLangOpen ? "block" : "none" }}
                >
                  <div
                    className="language-Svenska drop-down-element"
                    onClick={() => selectLanguage("sv")}
                  >
                    <div className="drop-down-lang-name">Svenska</div>
                    <img
                      src="https://storage.123fakturere.no/public/flags/SE.png"
                      className="drop-down-image"
                      alt="Svenska"
                    />
                  </div>
                  <div
                    className="language-English drop-down-element"
                    onClick={() => selectLanguage("en")}
                  >
                    <div className="drop-down-lang-name">English</div>
                    <img
                      src="https://storage.123fakturere.no/public/flags/GB.png"
                      className="drop-down-image"
                      alt="English"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </header>
    </nav>
  );
};

export default Navbar;
