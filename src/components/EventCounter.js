import React from "react";
import { GoOut, GoChat} from '../graphics/index.js';

const EventCounter = ({ events }) => {
  const rValueCounts = {};
  const tValueCounts = {};

  // count the number of times each R and T value appears in the events
  events.forEach((event) => {
    const tagWithR = event.tags.find((tag) => tag.includes("r"));
    if (tagWithR) {
      const valueOfR = tagWithR[1];
      if (valueOfR in rValueCounts) {
        rValueCounts[valueOfR]++;
      } else {
        rValueCounts[valueOfR] = 1;
      }
    }

    const tagWithT = event.tags.find((tag) => tag.includes("t"));
    if (tagWithT) {
      const valueOfT = tagWithT[1];
      if (valueOfT in tValueCounts) {
        tValueCounts[valueOfT]++;
      } else {
        tValueCounts[valueOfT] = 1;
      }
    }
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

  return (
    <div className="eventCounterContainer">
      <table>
        <thead>
          <tr>
            <th>Hashtags</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredTValueCounts.map(([tValue, count]) => (
            <tr key={tValue} className="eventContainer">
              <td>
                <a href={`https://snort.social/t/${tValue}`} target="_blank" rel="noreferrer" >{tValue} </a>
                <div className="buttonBox">
                  <a href={`https://chat.punkhub.me/?tag=${tValue}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} > <GoChat className="svg-src"/></a>
                  <a href={`https://snort.social/t/${tValue}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} > <GoOut className="svg-src"/></a>
                </div>
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>References</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredRValueCounts.map(([rValue, count]) => (
            <tr key={rValue} className="eventContainer">
              <td>
                <a href={`https://chat.punkhub.me/?ref=${rValue}`} target="_blank" rel="noreferrer">{rValue}</a>
                <div className="buttonBox">
                  <a href={`https://chat.punkhub.me/?ref=${rValue}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} > <GoChat className="svg-src"/></a>
                  <a href={rValue} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} > <GoOut className="svg-src"/></a>
                </div>
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventCounter;
