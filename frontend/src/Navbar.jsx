import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";

const Navbar = ({ lang, setLang, navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1266);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const langRef = useRef(null);

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
        (menuRef.current && !menuRef.current.contains(event.target)) &&
        (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) &&
        (langRef.current && !langRef.current.contains(event.target))
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

          {/* Hamburger */}
          <div className="open-menu-dds" onClick={toggleMenu} ref={hamburgerRef}>
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

          <div className="navigation-menu-bar" ref={menuRef}>
            {/* Mobile Menu */}
            <div
              className="menu-drop-down"
              style={{
                height: isMenuOpen ? "auto" : "0px",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <div className="menu-drop-down-container">
                <a className="menu-drop-down-item" href="/"><p>{nav.home}</p></a>
                <a className="menu-drop-down-item" href="/"><p>{nav.order}</p></a>
                <a className="menu-drop-down-item" href="/"><p>{nav.our_customer}</p></a>
                <a className="menu-drop-down-item" href="/"><p>{nav.about_us}</p></a>
                <a className="menu-drop-down-item" href="/"><p>{nav.contact_us}</p></a>
              </div>
            </div>

            {/* PC Menu */}
            <div className="pc-menu">
              <a className="pc-menu-items" href="/"><p className="collectionitem">{nav.home}</p></a>
              <a className="pc-menu-items" href="/"><p className="collectionitem">{nav.order}</p></a>
              <a className="pc-menu-items" href="/"><p className="collectionitem">{nav.our_customer}</p></a>
              <a className="pc-menu-items" href="/"><p className="collectionitem">{nav.about_us}</p></a>
              <a className="pc-menu-items" href="/"><p className="collectionitem">{nav.contact_us}</p></a>

              {isDesktop && (
                <a
                  className="pc-menu-items language-pc-menu-items"
                  href="#"
                  onClick={(e) => { e.preventDefault(); toggleLang(); }}
                  ref={langRef}
                >
                  <div className="language-box">
                    <p className="flag-name collectionitem">{lang === "en" ? "English" : "Svenska"}</p>
                    <img
                      src={lang === "en"
                        ? "https://storage.123fakturere.no/public/flags/GB.png"
                        : "https://storage.123fakturere.no/public/flags/SE.png"}
                      className="icon-flag-nav"
                      alt={lang === "en" ? "English" : "Svenska"}
                    />
                  </div>
                  <div className="dropdownList" style={{ display: isLangOpen ? "block" : "none" }}>
                    <div className="drop-down-element" onClick={() => selectLanguage("sv")}>
                      <div className="drop-down-lang-name">Svenska</div>
                      <img src="https://storage.123fakturere.no/public/flags/SE.png" className="drop-down-image" alt="Svenska"/>
                    </div>
                    <div className="drop-down-element" onClick={() => selectLanguage("en")}>
                      <div className="drop-down-lang-name">English</div>
                      <img src="https://storage.123fakturere.no/public/flags/GB.png" className="drop-down-image" alt="English"/>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Language Dropdown */}
          {!isDesktop && (
            <div className="lang-dropk" ref={langRef}>
              <div>
                <div className="dropdownContainer" onClick={toggleLang}>
                  <div className="language-box">
                    <p className="flag-name collectionitem">{lang === "en" ? "English" : "Svenska"}</p>
                    <img
                      src={lang === "en"
                        ? "https://storage.123fakturere.no/public/flags/GB.png"
                        : "https://storage.123fakturere.no/public/flags/SE.png"}
                      className="icon-flag-nav"
                      alt={lang === "en" ? "English" : "Svenska"}
                    />
                  </div>
                </div>
                <div className="dropdownList" style={{ display: isLangOpen ? "block" : "none" }}>
                  <div className="drop-down-element" onClick={() => selectLanguage("sv")}>
                    <div className="drop-down-lang-name">Svenska</div>
                    <img src="https://storage.123fakturere.no/public/flags/SE.png" className="drop-down-image" alt="Svenska"/>
                  </div>
                  <div className="drop-down-element" onClick={() => selectLanguage("en")}>
                    <div className="drop-down-lang-name">English</div>
                    <img src="https://storage.123fakturere.no/public/flags/GB.png" className="drop-down-image" alt="English"/>
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
