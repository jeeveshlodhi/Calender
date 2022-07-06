import "./App.css";

import Header from "./components/header";
import { getMonth } from "./util";
import "./css/calender.css";
import { Scheduler } from "./components/scheduler";
import { useContext, useEffect, useState } from "react";
import Calender from "./components/calender";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import CreateEventButton from "./components/CreateEventButton";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <div className="App">
        {showEventModal && <EventModal/>}
        <Header />
        <div className="bodyWrapper">
            
            <div className="calenderWrapper">
                <CreateEventButton/>
                <Calender />
            </div>
            <div className="schedulerWrapper">
                <Scheduler month={currentMonth} />
            </div>
        </div>
    </div>
  );
}

export default App;
