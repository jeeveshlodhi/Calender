import React, { createContext } from "react";

const GlobalContext = createContext({
    monthIndex: 0,
    setMonthIndex: (index)=>{},
    smallCalenderMonth: 0,
    setSmallCalenderMonth: (index) => {},
    daySelected: null,
    setDaySelected:(day)=>{}
})

export default GlobalContext