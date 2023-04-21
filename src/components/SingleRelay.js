import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import { RelayPool } from "nostr-relaypool";
import { nip19 } from 'nostr-tools';
import EventCounter from "./EventCounter";


function SingleRelay() {
  const [events, setEvents] = useState([]);
  const decodedRelay = nip19.decode(useParams().dynamicValue).data.split(",");
  const relayList = useMemo(() => decodedRelay, []);

  useEffect(() => {
    const subscribeToRelay = async () => {
      if (relayList) {
        const relayPool = new RelayPool(relayList);
        const dateNow = Math.floor(Date.now() / 1000);
        const datePast = dateNow-(86400);

        relayPool.subscribe(
          [
            {
              kinds: [1],
              since: datePast,
            },
          ],
          relayList,
          (event, isAfterEose, relayURL) => {
            setEvents((prevEvents) => [...prevEvents, event]);
          },
          undefined,
          (events, relayURL) => {
            console.log(events, relayURL);
          }
        );

        relayPool.onerror((err, relayUrl) => {
          console.log("RelayPool error", err, " from relay ", relayUrl);
        });

        relayPool.onnotice((relayUrl, notice) => {
          console.log("RelayPool notice", notice, " from relay ", relayUrl);
        });

        return () => {
          relayPool.close();
        };
      }
    };

    subscribeToRelay();
  }, [relayList]);

  return (
    <div>
        <h1>{relayList.join(", ")}</h1>

        <h2>Event Counter</h2>
        <EventCounter events={events} />
    </div>
  );
}

export default SingleRelay;
