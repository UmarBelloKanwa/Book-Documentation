import { IoCopyOutline, IoCloudDownloadOutline, IoCheckmarkCircle, IoSync } from "react-icons/io5";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import { useState } from "react";
import i18next from "i18next";
import styles from "./textActionsIcons.module.css";

const ActionsIcons = ({ data }) => {
  const {id, name, title, content} = data;
  const text = `${title} ${id} ${content}`;
  const [actionStatus, setActionStatus] = useState({
    copy: "idle",
    download: "idle",
    share: "idle",
    speak: "idle",
  });

  const resetStatus = (action) => {
    setTimeout(() => {
      setActionStatus((prevStatus) => ({
        ...prevStatus,
        [action]: "idle",
      }));
    }, 2000); // Reset after 2 seconds
  };

  const copyText = (text) => {
    setActionStatus({ ...actionStatus, copy: "doing" });
    navigator.clipboard.writeText(text).then(
      () => {
        setActionStatus({ ...actionStatus, copy: "done" });
        resetStatus("copy");
      },
      (err) => console.error("Failed to copy text: ", err)
    );
  };

  const downloadText = (text) => {
    setActionStatus({ ...actionStatus, download: "doing" });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${title}_${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setActionStatus({ ...actionStatus, download: "done" });
    resetStatus("download");
  };

  const shareText = (text) => {
    setActionStatus({ ...actionStatus, share: "doing" });
    if (navigator.share) {
      navigator
        .share({
          title: "Shared Text",
          text: text,
        })
        .then(() => {
          setActionStatus({ ...actionStatus, share: "done" });
          resetStatus("share");
        })
        .catch((err) => console.error("Failed to share text: ", err));
    } else {
      alert("Sharing not supported on this device.");
      setActionStatus({ ...actionStatus, share: "idle" });
    }
  };

  const speakText = (text) => {
    setActionStatus({ ...actionStatus, speak: "doing" });

    if (window.responsiveVoice) {
      const languageCode = i18next.language; // Get the current language from i18next

      // Map i18next language codes to responsiveVoice voice names
      const languageVoiceMap = {
        en: "UK English Male",
        ar: "Arabic Male",
      };

      const voiceName = languageVoiceMap[languageCode] || "UK English Female";

      window.responsiveVoice.speak(text, voiceName, {
        onend: () => {
          setActionStatus({ ...actionStatus, speak: "done" });
          resetStatus("speak");
        },
        onerror: (err) => {
          console.error("Speech synthesis error: ", err);
          setActionStatus({ ...actionStatus, speak: "idle" });
        },
      });
    } else {
      alert("Text-to-Speech is not available.");
      setActionStatus({ ...actionStatus, speak: "idle" });
    }
  };

  return (
    <ul className={styles.ul}>
      <li>
        <IoCopyOutline onClick={() => copyText(text)} />
        {actionStatus.copy === "doing" && <IoSync className={styles.icon} />}
        {actionStatus.copy === "done" && <IoCheckmarkCircle className={styles.icon} />}
      </li>
      <li>
        <IoCloudDownloadOutline onClick={() => downloadText(text)} />
        {actionStatus.download === "doing" && <IoSync className={styles.icon} />}
        {actionStatus.download === "done" && <IoCheckmarkCircle className={styles.icon} />}
      </li>
      <li>
        <MdRecordVoiceOver onClick={() => speakText(text)} />
        {actionStatus.speak === "doing" && <IoSync className={styles.icon} />}
        {actionStatus.speak === "done" && <IoCheckmarkCircle className={styles.icon} />}
      </li>
      <li>
        <FaRegShareSquare onClick={() => shareText(text)} />
        {actionStatus.share === "doing" && <FaShareSquare className={styles.icon} />}
        {actionStatus.share === "done" && <IoCheckmarkCircle className={styles.icon} />}
      </li>
    </ul>
  );
};

export default ActionsIcons;
