import React from "react";
import classNames  from "classnames";

import "components/DayListItem.scss"
import { render } from "@testing-library/react";
export default function DayListItem(props) {
  let dayClass = classNames({"day-list__item":true,"day-list__item--selected": props.selected, "day-list__item--full":(props.spots === 0) ? true :false })
  const formatSpots = function () {
    let text;
    if(props.spots === 0) {
      text = "no spots remaining";
    } else if (props.spots ===1) {
      text ="1 spot remaining";
    } else {
      text =`${props.spots} spots remaining`
    }
    render()
      return text;
  };
  
  return (
    <li onClick={() => props.setDay(props.name)}>
      <div className ={dayClass} >
      <h2>{props.name}</h2>
      <h3>{formatSpots()}</h3>
      </div>
    </li>
  );
}