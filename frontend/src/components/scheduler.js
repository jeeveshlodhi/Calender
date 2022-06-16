import React, { useState } from "react";
import { monthNames } from "../util";

export const Scheduler = ({ month }) => {
    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()
    const [currMonth, setCurrMonth] = useState(month)
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
        
        // console.log(row[0]);
        // return <div>{row[0].$D}</div>
        return row.map((day, j) => {
        //   console.log(j);

            if(j!==0){
                if(day.$D === todayDate && day.$M === todayMonth && day.$y === todayYear && day.$D === 1){
                    return <div className="dayWrapper current" key={`${i}${j}`}>{`${monthNames[day.$M]} ${day.$D} `}</div>;
                }
                else if(day.$D===1){
                    return <div className="dayWrapper" key={`${i}${j}`}>{`${monthNames[day.$M]} ${day.$D} `}</div>;
                }
                else if(day.$D === todayDate && day.$M === todayMonth && day.$y === todayYear && day.$D !== 1){
                    return <div className="dayWrapper current" key={`${i}${j}`}>{day.$D}</div>;
                }
                else{
                    return <div className="dayWrapper" key={`${i}${j}`}>{day.$D}</div>;
                }
            }
            else{
                if(day.$D === todayDate && day.$M === todayMonth && day.$y === todayYear && day.$D === 1){
                    return <div className="dayWrapper current firstDay" key={`${i}${j}`}>{`${monthNames[day.$M]} ${day.$D} `}</div>;
                }
                else if(day.$D===1){
                    return <div className="dayWrapper firstDay" key={`${i}${j}`}>{`${monthNames[day.$M]} ${day.$D} `}</div>;
                }
                else if(day.$D === todayDate && day.$M === todayMonth && day.$y === todayYear && day.$D !== 1){
                    return <div className="dayWrapper current firstDay" key={`${i}${j}`}>{day.$D}</div>;
                }
                else{
                    return <div className="dayWrapper firstDay" key={`${i}${j}`}>{day.$D}</div>;
                }
            }
          
          
          
        });
      })}
    </div>
  );
};
