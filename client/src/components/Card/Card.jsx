import React from "react";
import styles from "../Card/Card.module.css";
import "./Card.css";

const Card = ({ name, img, type, id }) => {
  return (
    <div className={styles.card} key={id}>
      <div className="container">
        <div className={`${type[0]}`}></div>
        <div className={`${type[1]}`}></div>
      </div>
      <h1>{name.toUpperCase()}</h1>

      <img src={img} className={styles.imgsize} alt={`pokemon ${name}`} />
      <h5>
        Type:{" "}
        {type.map((m) =>
          type.length > 1
            ? ` - ${m.charAt(0).toUpperCase() + m.slice(1)}`
            : `${m.charAt(0).toUpperCase() + m.slice(1)} `
        )}
      </h5>
    </div>
  );
};

export default Card;
