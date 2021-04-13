import React from "react";
import classNames  from "classnames";
import "components/InterviewListItem.scss"

export default function InterviewListItem(props) {
 let InterviewClass = classNames({"interviewers__item":true, "interviewers__item--selected":props.selected });
 let InterviewClassImage = classNames({"interviewers__item-image":true, "interviewers__item-image--selected-image":props.selected})
  return (

    <li onClick={() => props.setInterviewer(props.Id)} className={InterviewClass}>
  <img
    className={InterviewClassImage}
    src={props.avatar}
    alt={props.name}
  />{ props.selected && props.name}
</li>)
   
}