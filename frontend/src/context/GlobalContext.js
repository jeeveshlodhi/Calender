import { createContext } from "react";

const GlobalContext = createContext({
    monthIndex: 0,
    setMonthIndex: (index)=>{},
    smallCalenderMonth: 0,
    setSmallCalenderMonth: (index) => {},
    daySelected: null,
    setDaySelected:(day)=>{},
    isLogin: false,
    setLogin : () =>{},
    loginEmail: '',
    setLoginEmail: () =>{}, 
    showEventModal: false,
    setShowEventModal: ()=>{},
    dispatchCallEvent: ({type, payload})=>{},
    savedEvents: []
})

export default GlobalContext