import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

// DayListItem Component for individual day element

export default function DayListItem(props) {
  // set Class according to Selection
  let dayClass = classNames({ "day-list__item": true, "day-list__item--selected": props.selected, "day-list__item--full": (props.spots === 0) ? true : false })

  // Function to format Spots remaining for a particular day
  const formatSpots = function () {
    let text;
    if (props.spots === 0) {
      text = "no spots remaining";
    } else if (props.spots === 1) {
      text = "1 spot remaining";
    } else {
      text = `${props.spots} spots remaining`
    }
    return text;
  };

  return (
    <li onClick={() => props.setDay(props.name)} data-testid="day" >
      <div className={dayClass} >
        <h2>{props.name}</h2>
        <h3>{formatSpots()}</h3>
      </div>
    </li>
  );
}