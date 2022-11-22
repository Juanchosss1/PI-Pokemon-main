import React from "react";
import { NavLink } from "react-router-dom";
import img from "../../img/Error404/Surprised-Pikachu-Transparent-PNG.png";
import styles from "../Error404/Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1>Ups...</h1>

      <img className={styles.img} src={img} alt="Surprised pikachu" />
      <h3>
        The page you are looking for, may have been moved, deleted, or possibly
        never existed..
      </h3>

      <NavLink to="/home">
        <button className={styles.buton}>Return Home</button>
      </NavLink>
    </div>
  );
};

export default Error404;
