import React from "react";
import styles from "../Card/Card.module.css";

const Card = ({ name, img, type, id }) => {
  return (
    <div className={styles.card} key={id}>
      <h3>{name.toUpperCase()}</h3>

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
