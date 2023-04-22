import { RelayPool } from "nostr-relaypool";
import {nip19} from "nostr-tools";
import React, { useEffect, useMemo, useState} from "react";
import RelayCard from "./RelayCard";
import EventCounter from "./EventCounter";
import RelayButton from "./WellKnowRelays";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [pubKey, setPubKey] = useState("");
  const [newRelayList, setRelayList] = useState([]);
  const [showComponents, setShowComponents] = useState(false);
  const [inputRelay, setinputRelay] = useState('');
  const [isNavigateRelay, setIsNavigateRelay] = useState(false);

  const relayList = useMemo(() => [
    "wss://nos.lol",
    "wss://relay.nostr.band",
    "wss://nostr.wine/",
    "wss://universe.nostrich.land/",
    "wss://welcome.nostr.wine/"
  ], []);

  useEffect(() => {
    if (pubKey) {
      const relayPool = new RelayPool(relayList);

      relayPool.subscribe(
        [
          {
            kinds: [3],
            authors: [pubKey],
          },
        ],
        relayList,
        (event, isAfterEose, relayURL) => {
          const objRelays = Object.keys(JSON.parse(event.content));
          const newRelayList = [...objRelays];
          const dateNow = Math.floor(Date.now() / 1000);
          const datePast = dateNow-(86400);
          setRelayList(newRelayList);
          relayPool.subscribe(
            [
              {
                kinds: [1],
                since: datePast,
              },
            ],
            newRelayList,
            (event, isAfterEose, relayURL) => {
              setEvents((prevEvents) => [...prevEvents, event]);
            },
            undefined,
            (events, relayURL) => {
              console.log(events, relayURL);
            }
          );
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
  }, [pubKey, relayList]);

  async function logIn() {
    if (window.nostr) {
      try {
        const pubKey = await window.nostr.getPublicKey();
        return pubKey;
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  }

  async function fetchData() {
    const key = await logIn();
    if (key) {
      setPubKey(key);
      setShowComponents(true);
    }
  }
  const handleEncodeClick = () => {
    const encodedText = nip19.nrelayEncode(inputRelay);
    window.location.href = `/relay/${encodedText}`;
  };
  useEffect(() => {
    if (isNavigateRelay) {
      document.getElementById('inputRelay').focus();
    }
  }, [isNavigateRelay]);

  return (
    <div className="appContainer">
      <h2>See what is trendy in your relays</h2>
      <h3>WIP!</h3>
      <p>When you press 'Fetch your relays' it will find your public relay list and then it will scrape your relays looking for notes with a '#r' and '#t' tag, at the same time it will count how many times an 'R value' and 'T value' is repeated and it will show you in a sorted list.</p>
      <p>'R values' and 'T values' are links that take you to a nostrichat over chat.punkhub, that ref set as the topic. There you'll be able to see what the peops are talking about that ref and you'll be able to comment too!</p>
      <p>More PoW coming, expect improvements</p>
      <h3>💡Notes since the last 24h</h3>
      <div className="buttonContainer">
        <button onClick={fetchData}>Fetch your relays</button>
        {!isNavigateRelay && (
          <div>
            <button onClick={() => setIsNavigateRelay(true)}>Navigate other relays</button>
          </div>
        )}
        {isNavigateRelay && (
          <div>
            <input placeholder="Relay URL or comma-separated list" type="text" value={inputRelay} onChange={(e) => setinputRelay(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); handleEncodeClick(); } }} id="inputRelay" />
            <button onClick={handleEncodeClick}>Go</button>
          </div>
        )}
      </div>
      {isNavigateRelay && (
          <div>
            <div className="WellKnowRelays">
              <h3>Well Know Relays</h3>
              <RelayButton relayId={"wss://nos.lol"} />
              <RelayButton relayId={"wss://relay.nostr.band"} />
              <RelayButton relayId={"wss://relay.snort.social"} />
              <RelayButton relayId={"wss://relay.damus.io"} />
              <RelayButton relayId={"wss://eden.nostr.land/"} />
            </div>
          </div>
        )}
      <div>
        {showComponents ? (
          <div>
            <RelayCard objRelays={newRelayList} details={false}/>
            <h2>Event Counter</h2>
            <EventCounter events={events} relays={newRelayList} />
          </div>
        ) : null}
        </div>
    </div>
  );
};
export default Home;