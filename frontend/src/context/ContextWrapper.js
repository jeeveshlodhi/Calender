import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((event) => (event.id === payload.id ? payload : event));
    case "delete":
      return state.filter((event) => event.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [isLogin, setLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, dispatchCallEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify((savedEvents)))
  }, [savedEvents])
  

  useEffect(() => {
    if (smallCalenderMonth !== null) {
      setMonthIndex(smallCalenderMonth);
    }
  }, [smallCalenderMonth]);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalenderMonth,
        setSmallCalenderMonth,
        daySelected,
        setDaySelected,
        isLogin,
        setLogin,
        loginEmail,
        setLoginEmail,
        showEventModal,
        setShowEventModal,
        dispatchCallEvent,
        savedEvents
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
