import React from "react";

const Card = ({ event, tagWithR }) => {
  return (
    <div className="eventContainer">
      <h3>{event.id}</h3>
      {/* <p>{tagWithR}</p> */}
      <p>{tagWithR[1]}</p>
    </div>
  );
};

export default Card;
