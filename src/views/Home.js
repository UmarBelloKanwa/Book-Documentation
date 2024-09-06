import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import Basmalah from "../components/Basmalah";
import Text from "../components/Text";
import Button from "../components/Button";
import Head from "../components/Head";
import cover_1 from "../images/cover_one.jpg";
import cover_2 from "../images/cover_two.png";
import cover_3 from "../images/cover_three.png";
import styles from "./Home.module.css";

const Home = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const images = [cover_1, cover_2, cover_3];

  const changeImage = (dir) => {
    setImgIndex((prevIndex) =>
      dir === "next"
        ? (prevIndex + 1) % images.length
        : (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className={styles.basmala}>
        <Basmalah />
      </div>
      <div className={styles.intro}>
        <div>
          <Text>{t("book.about.heading")}</Text>
        </div>
        <div
          className={styles.book}
          style={{ backgroundImage: `url(${images[imgIndex]})` }}
        >
          <MdOutlineArrowBackIos onClick={() => changeImage("next")} />
          <MdOutlineArrowForwardIos onClick={() => changeImage("prev")} />
        </div>
        <div>
          <Head>{t("introduction")}</Head>
          <Text>{t("book.about.preface")}</Text>
        </div>
      </div>
      <Button handleClick={() => navigate("/chapters")}>
        {t("start-reading")}
      </Button>
    </>
  );
};

export default Home;
