import React from "react";
import  DayListItem from "components/DayListItem";

// DayList COmponent which lists day
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