import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { useModel } from "../models";
import ChapterDetail from "./ChapterDetail";
import { useMediaQuery } from "react-responsive";
import ChaptersList from "../components/ChaptersList";
import NoPage from "./NoPage";
import styles from "./Chapters.module.css";

function Chapters() {
  const { chapterName } = useParams();
  const navigate = useNavigate();
  const model = useModel();
  const { t, urlToTitle, getChapterByTitle } = model;

  const [isNavVisible, setIsNavVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const introduction = !chapterName
    ? t("book.about", { returnObjects: true })
    : null;
  const chapter = chapterName
    ? getChapterByTitle(urlToTitle(chapterName))
    : null;

  const handleMouse = () => {
    if (isMobile) {
      setIsNavVisible(v => !v);
    }
  };
  const handleChapterClick = (url) => {
    navigate(url);
    if (isMobile) {
      setIsNavVisible(false);
    }
  };

  return (
    <div className={styles.page}>
      <aside>
        {isMobile && (
          <div
            className={styles.menu}
            onMouseEnter={handleMouse}
            onMouseLeave={handleMouse}
          >
            <TiThMenuOutline />
          </div>
        )}
        {(!isMobile || isNavVisible) && (
          <nav
            className={styles.nav}
            onMouseEnter={handleMouse}
            onMouseLeave={handleMouse}
          >
            <ChaptersList handleChapterClick={handleChapterClick} className="chaptersList"/>
          </nav>
        )}
      </aside>
      {introduction || chapter ? (
        <ChapterDetail content={{ introduction, chapter }} />
      ) : (
        <NoPage />
      )}
    </div>
  );
}

export default Chapters;
