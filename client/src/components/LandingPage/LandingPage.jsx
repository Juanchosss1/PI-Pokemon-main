import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.background}>
      <Link to="/home" className={styles.button}>
        <button>Entrar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
