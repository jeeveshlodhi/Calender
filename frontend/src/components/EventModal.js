import React, { useContext, useState } from "react";
import { FaBars, FaCheck, FaRegBookmark, FaRegClock } from "react-icons/fa";
import { MdSegment } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

const EventModal = () => {
  const lables = ["indigo", "gray", "green", "blue", "red", "purple"];
  const { setShowEventModal, daySelected, dispatchCallEvent } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labelSelector, setLabelSelector] = useState(lables[0]);

  const handleSubmit = (e) => {
    if(title.length === 0){
        return
    }
    e.preventDefault()
    const calenderEvent = {
        title, 
        description,
        label:labelSelector,
        day: daySelected.valueOf(),
        id: Date.now()
    }
    dispatchCallEvent({type: 'push', payload: calenderEvent})
    setShowEventModal(false)
  }

  return (
    <div className="eventWrapper">
      <form action="" className="eventForm">
        <div className="eventHeader">
          <span>
            <FaBars />
          </span>
          <span className="eventClose" onClick={() => setShowEventModal(false)}>
            &times;
          </span>
        </div>
        <div className="eventHeadWrapper">
          <div className="eventGrid">
            <div></div>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="eventTitleInput"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="focus-border"></span>
            </div>
            <div className="eventIcon">
              <FaRegClock />
            </div>
            <div className="eventDate">
              <span>{daySelected.format("dddd, MMMM DD")}</span>
            </div>
            <div className="eventIcon">
              <MdSegment />
            </div>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Add Description"
                value={description}
                required
                className="eventTitleInput"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="focus-border"></span>
            </div>
            <div className="eventIcon">
              <FaRegBookmark />
            </div>
            <div className="eventLabelWrapper">
              {lables.map((label, i) => (
                <span
                  key={i}
                  style={{ backgroundColor: label }}
                  className="eventLabel"
                  onClick={() => setLabelSelector(label)}
                >
                  {labelSelector === label && (
                    <span className="eventCheck">
                      <FaCheck />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="eventSubmitWrapper">
            <input
              type="submit"
              value="Schedule"
              className="eventSubmit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventModal;
