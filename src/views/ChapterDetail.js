import React, { useRef, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useModel } from "../models";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import ActionsIcons from "../components/textActionsIcons";
import Basmalah from "../components/Basmalah";
import Head from "../components/Head";
import Text from "../components/Text";
import styles from "./ChapterDetail.module.css";

function ChapterDetail({ content }) {
  const { chapterName } = useParams();
  const { t, chaptersUrls } = useModel();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if it's the introduction or a specific chapter
  const isIntroduction = !chapterName || !chaptersUrls.includes(chapterName);

  // Define sections based on the introduction or chapter content
  const sections = [
    {
      id: "main",
      title: isIntroduction
        ? content.introduction?.title
        : content.chapter.title,
      content: isIntroduction
        ? content.introduction?.introduction
        : content.chapter?.text,
    },
    {
      id: "interpretation",
      title: !isIntroduction && t("interpretation"),
      content: isIntroduction
        ? content.introduction?.preface
        : content.chapter?.interpretation,
    },
    {
      id: "explanation",
      title: !isIntroduction && t("explanation"),
      content: isIntroduction
        ? content.introduction?.heading
        : content.chapter?.explanation,
    },
    {
      id: "video",
      title: t("video"),
      content: isIntroduction ? "" : content.chapter?.video_link,
    },
    {
      id: "audio",
      title: t("audio"),
      content: isIntroduction ? "" : content.chapter?.audio_link,
    },
  ];

  const refs = {
    main: useRef(null),
    interpretation: useRef(null),
    explanation: useRef(null),
    video: useRef(null),
    audio: useRef(null),
  };

  const handleScroll = (id) => {
    refs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash) handleScroll(location.hash.substring(1));
  }, [location.hash]);

  const navigateToChapter = (direction) => {
    const currentIndex = chaptersUrls.indexOf(chapterName);
    const newIndex =
      (currentIndex + (direction === "next" ? 1 : -1) + chaptersUrls.length) %
      chaptersUrls.length;
    navigate(`/chapters/${chaptersUrls[newIndex]}`);
  };

  return (
    <>
      <article className={styles.article}>
        {isIntroduction && <Basmalah />}
        {sections.map(({ id, title, content }) =>
          content ? (
            <div
              key={id}
              ref={refs[id]}
              className={
                styles[id === "video" || id === "audio" ? "media" : "context"]
              }
            >
              <Head>{title}</Head>
              {id === "video" ? (
                <iframe
                  title={id}
                  src={content}
                  allowFullScreen
                  className={styles.video}
                />
              ) : id === "audio" ? (
                <audio src={content} controls className={styles.audio} />
              ) : (
                <>
                  <Text>{content}</Text>
                  <ActionsIcons
                    data={{
                      id,
                      name: t("hadith") + content.id,
                      title,
                      content,
                    }}
                  />
                </>
              )}
            </div>
          ) : null
        )}
      </article>
      <div className={styles.heads}>
        {sections
          .filter(({ content }) => content)
          .map(({ id, title }, i) => (
            <span key={id} onClick={() => handleScroll(id)}>
              { title}
            </span>
          ))}
        <div>
          <BsArrowLeftCircleFill
            onClick={() => navigateToChapter("previous")}
          />
          <BsArrowRightCircleFill onClick={() => navigateToChapter("next")} />
        </div>
      </div>
    </>
  );
}

export default ChapterDetail;