import React from "react";
import { useNavigate } from "react-router-dom";
import { useModel } from "../models";
import { FaFacebook } from "react-icons/fa";
import { BsWhatsapp, BsTwitterX } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  const { t } = useModel();

  return (
    <footer className={styles.footer}>
      <div className={styles.navs}>
        <span onClick={() => navigate("/chapters")}>
         {t("start-reading")}
       </span>
       <span onClick={() => navigate("/multimedia")}>{t("multimedia")}</span>
       <span onClick={() => navigate("/chapters-list")}>
         {t("table-of-contents")}
       </span>
      </div>
      <div className={styles.contact}>
        <a
          href="https://web.facebook.com/umarbellokanwa"
          aria-label="Visit Facebook profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://wa.me/2349065936704"
          aria-label="Contact on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp />
        </a>
        <a
          href="mailto:Umarbellokanwa@gmail.com"
          aria-label="Send an email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoGmail />
        </a>
        <a
          href="https://www.x.com/umarbellokanwa"
          aria-label="Visit Twitter profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitterX />
        </a>
      </div>
      <div className={styles.footerBottom}>
        <span className={styles.copyright} dir="ltr">
          &copy; {new Date().getFullYear()} Umar Bello Kanwa. All rights
          reserved.
        </span>
        <span> Created on 05/09/2024</span>
      </div>
    </footer>
  );
}

export default Footer;
