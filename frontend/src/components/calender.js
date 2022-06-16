import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

const Calender = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalenderMonth, setDaySelected, daySelected } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };
  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format)
    if (nowDay === currDay) {
      return "miniCurr";
    } else if(currDay === slcDay){
      return 'miniCurrDay'
    }
     else {
      return "";
    }
  };
  console.log(currentMonth, currentMonthIdx);

  return (
    <div className="miniCalender">
      <div className="miniHeader">
        <div className="miniDate">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </div>
        <div className="miniArrow">
          <FaAngleLeft onClick={handlePrevMonth} />
          <FaAngleRight onClick={handleNextMonth} />
        </div>
      </div>
      <div className="miniContent">
        {currentMonth[0].map((day, i) => {
          return (
            <div key={i} className="miniDay">
              {day.format("dd").charAt(0)}
            </div>
          );
        })}
        {currentMonth.map((row, i) => {
          return row.map((day, j) => {
            return (
              <button className={`miniDate ${getDayClass(day)}`}
              key={j} onClick={()=>{
                setSmallCalenderMonth(currentMonthIdx)
                setDaySelected(day)
              }}  >
                <span>{day.format("D")}</span>
              </button>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Calender;
