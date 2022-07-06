import React from "react";
import Day from "./day";

export const Scheduler = ({month}) => {

  return (
    <div className="schedulerGrid">
      <div className="weekday firstDay">Sun</div>
      <div className="weekday">Mon</div>
      <div className="weekday">Tue</div>
      <div className="weekday">Wed</div>
      <div className="weekday">Thur</div>
      <div className="weekday">Fri</div>
      <div className="weekday">Sat</div>

      {month.map((row, i) => {
        return row.map((day, j) => {
            return <Day key={j} day = {day} idx = {j} />
   
        });
      })}
    </div>
  );
};
