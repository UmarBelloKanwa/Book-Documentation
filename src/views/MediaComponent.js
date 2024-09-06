import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useModel } from "../models";
import styles from "./MediaComponent.module.css";

const Media = ({ setIsSearchVisible, handleChapterClick, className }) => {
  const { t, titleToURL } = useModel();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChapters, setFilteredChapters] = useState([]);

  const chapters = t("book.chapters", { returnObjects: true });

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
  }, [searchTerm]);

  handleChapterClick ??= (url) => {
    if (className === "searchChapters") {
      setIsSearchVisible();
    }
    navigate(url);
  };

  return (
    <div className={styles.media}>
      <div className={styles.searchBar}>
        <SearchBar
          placeholder={t("search-for")}
          onInput={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>
      <div className={styles.listContainer}>
        {filteredChapters.map(({ id, title, audio_link, video_link }) => (
          <div key={id} className={styles.mediaItem}>
            {video_link && (
              <iframe
                src={video_link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
                title={`video-${id}`}
              ></iframe>
            )}
            {audio_link && (
              <audio src={audio_link} controls className={styles.audio}>
                Your browser does not support the audio element.
              </audio>
            )}
            <span
              className={styles.mediaTitle}
              onClick={() => navigate(`/chapters/${titleToURL(title)}`)}
            >
              {id} - {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
