import React from "react";
import classNames  from "classnames";
import  DayListItem from "components/DayListItem";

export default function DayList(props) {

  const List = props.days.map((day,index) =>
  <DayListItem 
  key= {index}
  name={day.name} 
  spots={day.spots} 
  selected ={day.name === props.day}
  setDay={props.setDay}  />
  )
  
  return (
    <ul>{List}</ul>
  );
}