import "./App.css";

import Header from "./components/header";
import { getMonth } from "./util";
import './css/calender.css';
import { Scheduler } from "./components/scheduler";
import { useContext, useEffect, useState } from "react";
import Calender from "./components/calender";
import GlobalContext from "./context/GlobalContext";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const {monthIndex} = useContext(GlobalContext)
  
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <div className="App">
		<Header />
    <div className="bodyWrapper">
      <div className="calenderWrapper">
        <Calender/>
      </div>
      <div className="schedulerWrapper">
        <Scheduler month = {currentMonth} />
      </div>
    </div>
    </div>
  );
}

export default App;
