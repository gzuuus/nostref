import React from "react";

const RelayCard = (props) => {
  return (
    <div className="relayCard">
      
      <details>
        <summary><h2>+ Relay List ({props.objRelays.length})</h2></summary>
      <ul>
      {props.objRelays.map((relay, index) => (
        <li key={index}>{relay}</li>
      ))}
      </ul>
      </details>
    </div>
  );
};

export default RelayCard;
