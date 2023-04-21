import React from "react";
import { nip19 } from 'nostr-tools';

function RelayButton({ relayId }) {
    const encodedNRelay = nip19.nrelayEncode(relayId);
  const handleClick = () => {
    window.location.href = `${window.location.origin}/relay/${encodedNRelay}`;
  };

  return (
    <button onClick={handleClick}>{relayId}</button>
  );
}

export default RelayButton;
