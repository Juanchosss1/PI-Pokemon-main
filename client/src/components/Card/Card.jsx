import React from "react";

const Card = ({ name, img, types }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={img} alt={`pokemon ${name}`} />
    </div>
  );
};

export default Card;
