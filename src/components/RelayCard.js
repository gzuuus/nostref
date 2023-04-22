import React from "react";
import RelayButton from "./WellKnowRelays";

const RelayCard = (props) => {
  return (
    <div className="relayCard">

      <details open={props.details}>
        <summary><h2>+ Relay List ({props.objRelays.length})</h2></summary>
      <ul>
      {props.objRelays.map((relay, index) => (
        <li key={index}><RelayButton  relayId={relay} /></li>
      ))}
      </ul>
      </details>
    </div>
  );
};

export default RelayCard;
