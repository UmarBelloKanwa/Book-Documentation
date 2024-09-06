import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { useModel } from "../models";
import SearchBar from "./SearchBar";
import styles from "./ChaptersList.module.css";

const ChaptersList = ({
  setIsSearchVisible,
  handleChapterClick,
  className,
}) => {
  const { t, titleToURL } = useModel();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChapters, setFilteredChapters] = useState([]);

  const chapters = [
    { id: "0", title: t("introduction") },
    ...t("book.chapters", { returnObjects: true }),
  ];

  const searchInChapter = (chapter, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    for (const key in chapter) {
      if (
        typeof chapter[key] === "string" &&
        chapter[key].toLowerCase().includes(lowerCaseSearchTerm)
      ) {
        return true;
      }
      if (
        typeof chapter[key] === "number" &&
        chapter[key].toString().toLowerCase().includes(lowerCaseSearchTerm)
      ) {
        return true;
      }
      if (typeof chapter[key] === "object" && chapter[key] !== null) {
        for (const subKey in chapter[key]) {
          if (
            typeof chapter[key][subKey] === "string" &&
            chapter[key][subKey].toLowerCase().includes(lowerCaseSearchTerm)
          ) {
            return true;
          }
          if (
            typeof chapter[key][subKey] === "number" &&
            chapter[key][subKey]
              .toString()
              .toLowerCase()
              .includes(lowerCaseSearchTerm)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredChapters(chapters);
    } else {
      setFilteredChapters(
        chapters.filter((chapter) => searchInChapter(chapter, searchTerm))
      );
    }
  }, [searchTerm, chapters]);

  handleChapterClick ??= (url) => {
    if (className === "searchChapters") {
      setIsSearchVisible();
    }
    navigate(url);
  };

  return (
    <div className={styles[className]}>
      {className === "searchChapters" && (
        <MdCancel className={styles.cancel} onClick={setIsSearchVisible} />
      )}
      <div className={styles.searchBar}>
        <SearchBar
          placeholder={t("search-for")}
          onInput={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>
      <div className={styles.listContainer}>
        {filteredChapters.map(({ id, title }) =>
          id === "0" ? (
            <div
              key={id}
              onMouseDown={() => handleChapterClick("/chapters")}
              className={styles.intro}
            >
              {title}
            </div>
          ) : (
            <div
              key={id}
              onMouseDown={() =>
                handleChapterClick(`/chapters/${titleToURL(title)}`)
              }
              className={styles.chapterLink}
            >
              <span>{id}-</span>
              <span>{title}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChaptersList;
