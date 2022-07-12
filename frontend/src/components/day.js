import dayjs from "dayjs";
import React, { useEffect, useState, useContext } from "react";
import { monthNames } from "../util";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day, idx }) => {
  const [isCurrent, setCurrent] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);
  const { setShowEventModal, setDaySelected, savedEvents } =
    useContext(GlobalContext);

  useEffect(() => {
    if (dayjs().format("DD-MM-YY") === day.format("DD-MM-YY")) {
      setCurrent(() => true);
    } else if (isCurrent === true) {
      setCurrent(() => false);
    }
  });
  useEffect(() => {
    const events = savedEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div
      className="dayWrapper "
      onClick={() => {
        setShowEventModal(true);
        setDaySelected(day);
      }}
    >
      <div>
        {isCurrent ? (
          <div>
            <div className="current">{day.format("DD")}</div>
          </div>
        ) : day.format("DD") === "01" ? (
          <div>
            <div>{monthNames[day.format("MM") - 1]}</div>
            <div>{day.format("DD")}</div>
          </div>
        ) : (
          <div>{day.format("DD")}</div>
        )}
      </div>
      <div>
        {dayEvents.map((evt, i) => (
          <div
            key={i}
            style={{ backgroundColor: evt.label }}
            className="eventList"
            onClick={()=>console.log('hello')}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
