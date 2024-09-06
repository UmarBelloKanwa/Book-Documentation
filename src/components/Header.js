import React, { useState, useEffect } from "react";
import i18next from "i18next";
import ar_logo from "../images/ar_logo.png";
import en_logo from "../images/en_logo.png";
import { GrLanguage } from "react-icons/gr";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useModel } from "../models";
import SearchBar from "./SearchBar";
import ChaptersList from "./ChaptersList";
import styles from "./Header.module.css";

function Header() {
  const { t, settings, saveSetting } = useModel();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const isDarkMode = settings.theme === "dark";

  const toggleTheme = () => saveSetting("theme", isDarkMode ? "light" : "dark");

  const handleMouse = () => setIsHovered((v) => !v);

  const logo = i18next.language === "ar" ? ar_logo : en_logo;

  const handleClickOutside = (event) => {
    if (event.target.closest(`.${styles.searchChapters}`)) return;
    setIsSearchVisible(false);
  };

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <>
      {isSearchVisible && <div className={styles.blurWrapper} />}
      <header className={styles.header}>
        <nav>
          <div className={styles.title}>
            <img
              alt={t("book.about.title")}
              src={logo}
              onClick={() => navigate("/")}
            />
          </div>
          <div className={styles.icons}>
            <GrLanguage onMouseEnter={handleMouse} onMouseLeave={handleMouse} />
            {isDarkMode ? (
              <MdOutlineLightMode onClick={toggleTheme} />
            ) : (
              <MdOutlineDarkMode onClick={toggleTheme} className={styles.dark} />
            )}
          </div>
          <div className={styles.contents}>
            <div className={styles.searchBar}>
              <SearchBar
                onClick={() => setIsSearchVisible((v) => !v)}
                placeholder={t("search-for")}
                readOnly={true}
              />
            </div>
            <span onClick={() => navigate("/multimedia")}>{t("multimedia")}</span>
            <span onClick={() => navigate("/chapters-list")}>
              {t("table-of-contents")}
            </span>
          </div>
        </nav>
        <div
          className={styles.selectLangs}
          onMouseEnter={handleMouse}
          onMouseLeave={handleMouse}
        >
          {!isHovered ? (
            <GrLanguage className={styles.icon} />
          ) : (
            <div>
              <h2>{t("lang")}</h2>
              <ul>
                {t("languages", { returnObjects: true }).map(({ name, code }) => (
                  <li key={code} onClick={() => saveSetting("lang", code)}>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {isSearchVisible && (
          <ChaptersList
            setIsSearchVisible={() => setIsSearchVisible(false)}
            className="searchChapters"
          />
        )}
      </header>
    </>
  );
}

export default Header;
