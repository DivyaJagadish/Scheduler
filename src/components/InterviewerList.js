import React from "react";
import classNames  from "classnames";
import "components/InterviewerList.scss"
import InterviewListItem from "components/InterviewListItem"
export default function InterviewList(props) {

  const InterviewerList = props.interviewers.map((interviewer) =>
  <InterviewListItem 
  key= {interviewer.id}
  name={interviewer.name} 
  avatar={interviewer.avatar} 
  selected ={interviewer.id === props.interviewer}
  setInterviewer={props.setInterviewer}  />
  )
  
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewerList}</ul>
  </section>
  )
}