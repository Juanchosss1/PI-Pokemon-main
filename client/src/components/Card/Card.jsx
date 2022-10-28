import React from "react";

const Card = ({ name, img, type, id }) => {
  return (
    <div key={id}>
      <h3>{name}</h3>
      <img src={img} alt={`pokemon ${name}`} />
      
<h5>Type: {type.map(m=>
          type.length>1?` - ${m.charAt(0).toUpperCase()+m.slice(1)}`:`${m.charAt(0).toUpperCase()+m.slice(1)} `)}</h5>
      
    </div>
  );
};

/*
*/
          export default Card;
