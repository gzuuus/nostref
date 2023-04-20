import { RelayPool } from "nostr-relaypool";
import React, { useEffect, useMemo, useState } from "react";
//import Card from "./components/Card";
import RelayCard from "./components/RelayCard";
import EventCounter from "./components/EventCounter";
import Footer from "./components/Footer";
import { Logo} from './graphics/index.js';

const App = () => {
  const [events, setEvents] = useState([]);
  const [pubKey, setPubKey] = useState("");
  const [newRelayList, setRelayList] = useState([]);
  const [showComponents, setShowComponents] = useState(false);

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

  return (
    <div className="appContainer">
      <h1><Logo className="Logo" />NostrRef</h1>
      <h2>See what is referenced in your relays</h2>
      <h3>WIP!</h3>
      <p>When you press 'Fetch your relays' it will find your public relay list and then it will scrape your relays looking for notes with a '#r' and '#t' tag, at the same time it will count how many times an 'R value' and 'T value' is repeated and it will show you in a sorted list.</p>
      <p>'R values' and 'T values' are links that take you to a nostrichat over chat.punkhub, that ref set as the topic. There you'll be able to see what the peops are talking about that ref and you'll be able to comment too!</p>
      <p>More PoW coming, expect improvements</p>
      <h3>💡Notes since the last 24h</h3>
      <button onClick={fetchData}>Fetch your relays</button>
      <div>
      
      {showComponents ? (
        <div>
          <RelayCard objRelays={newRelayList} />
          <h2>Event Counter</h2>
          <EventCounter events={events} />
        </div>
      ) : null}
      </div>
      <Footer />
    </div>
  );
};
export default App;