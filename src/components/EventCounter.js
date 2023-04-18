import React from "react";

const EventCounter = ({ events }) => {
  const valueCounts = {};

  // count the number of times each R value appears in the events
  events
    .filter((event) => event.tags.find((tag) => tag.includes("r")))
    .forEach((event) => {
      const tagWithR = event.tags.find((tag) => tag.includes("r"));
      if (tagWithR) {
        const valueOfR = tagWithR[1];
        if (valueOfR in valueCounts) {
          valueCounts[valueOfR]++;
        } else {
          valueCounts[valueOfR] = 1;
        }
      }
    });
    
  // filter the R-values that have a count greater than 1
  const filteredValueCounts = Object.entries(valueCounts).filter(
      ([rValue, count]) => count > 0
  );
  
  // sort the filteredValueCounts array by count in descending order
  filteredValueCounts.sort((a, b) => b[1] - a[1]);

  return (
    <div className="eventCounterConteiner" >
      <h2>Event Counter</h2>
      <table>
        <thead>
          <tr>
            <th>R Value (last 24h)</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredValueCounts.map(([rValue, count]) => (
            <tr key={rValue}className="eventContainer">
              <td><a href={`https://chat.punkhub.me/?ref=${rValue}`}target="_blank" rel="noreferrer">{rValue}</a></td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventCounter;
