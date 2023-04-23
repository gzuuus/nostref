import React, { useState, useEffect } from "react";
import { GoOut, GoChat } from "../graphics/index.js";
import FileTypePreview from "./FileTypePreview.js";

const EventCounter = ({ events, relays }) => {
  const [isRTableVisible, setIsRTableVisible] = useState(true);
  const [isTTableVisible, setIsTTableVisible] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const rValueCounts = {};
  const tValueCounts = {};
  // count the number of times each R and T value appears in the events
  events.forEach((event) => {
    event.tags.forEach((tag) => {
      if (tag.includes("r")) {
        for (let i = 1; i < tag.length; i++) {
          const valueOfR = tag[i];
          if (valueOfR in rValueCounts) {
            rValueCounts[valueOfR]++;
          } else {
            rValueCounts[valueOfR] = 1;
          }
        }
      }

      if (tag.includes("t")) {
        for (let i = 1; i < tag.length; i++) {
          const valueOfT = tag[i];
          if (valueOfT in tValueCounts) {
            tValueCounts[valueOfT]++;
          } else {
            tValueCounts[valueOfT] = 1;
          }
        }
      }
    });
  });

  // filter the R-values that have a count greater than 0
  const filteredRValueCounts = Object.entries(rValueCounts).filter(
    ([rValue, count]) => count > 0
  );

  // sort the filteredRValueCounts array by count in descending order
  filteredRValueCounts.sort((a, b) => b[1] - a[1]);

  // filter the T-values that have a count greater than 0
  const filteredTValueCounts = Object.entries(tValueCounts).filter(
    ([tValue, count]) => count > 0
  );

  // sort the filteredTValueCounts array by count in descending order
  filteredTValueCounts.sort((a, b) => b[1] - a[1]);

  const handleClick = () => setShowMore(!showMore);
  const displayedCount = showMore ? filteredTValueCounts.length : 10;
  const handleShowMore = () => handleClick();
  const toggleRTable = () => setIsRTableVisible(!isRTableVisible);
  const toggleTTable = () => setIsTTableVisible(!isTTableVisible);

  return (
    <div>
      <div>
      <button className={`toggleButton ${isTTableVisible ? '' : 'disable'}`} onClick={toggleTTable}>Hashtags table</button>
      <button className={`toggleButton ${isRTableVisible ? '' : 'disable'}`} onClick={toggleRTable}>Ref table</button>
      </div>
    <div className="eventCounterContainer">
      {isTTableVisible && 
      <table className="TTable">
        <thead>
          <tr>
            <th>Hashtags</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredTValueCounts.slice(0, displayedCount).map(([tValue, count]) => (
            <tr key={tValue} className="eventContainer">
              <td>
                <a href={`https://snort.social/t/${tValue}`} target="_blank" rel="noreferrer">{tValue}</a>
                <div className="buttonBox">
                  <a href={`https://chat.punkhub.me/?tag=${tValue}&relays=${relays}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} ><GoChat className="svg-src"/></a>
                  <a href={`https://snort.social/t/${tValue}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} ><GoOut className="svg-src"/></a>
                </div>
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      {isRTableVisible &&
      <table className="RTable">
        <thead>
          <tr>
            <th>References</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredRValueCounts.slice(0, displayedCount).map(([rValue, count]) => (
            <tr key={rValue} className="eventContainer">
              <td>
                <FileTypePreview rValue={rValue} />
                <a href={`https://chat.punkhub.me/?ref=${rValue}&relays=${relays}`} target="_blank" rel="noreferrer">{rValue}</a>
                <div className="buttonBox">
                  <a href={`https://chat.punkhub.me/?ref=${rValue}&relays=${relays}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} ><GoChat className="svg-src"/></a>
                  <a href={rValue} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} ><GoOut className="svg-src"/></a>
                </div>
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
    {displayedCount < filteredRValueCounts.length && (isRTableVisible || isTTableVisible) &&(
        <button className="loadMoreButton" onClick={handleShowMore}>Load more</button>
      )}
    {showMore && (
        <button className="loadMoreButton" onClick={handleShowMore}>Load less</button>
      )}
    </div>
  );
      }  
export default EventCounter;
