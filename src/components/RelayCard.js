import React from "react";

const RelayCard = (props) => {
  return (
    <div className="relayCard">
      <h2>Relay List</h2>
      <ul>
      {props.objRelays.map((relay, index) => (
        <li key={index}>{relay}</li>
      ))}
      </ul>
    </div>
  );
};

export default RelayCard;
