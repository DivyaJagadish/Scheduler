import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"
import InterviewListItem from "components/InterviewListItem";

// Component to render the List of Interviewers WITH THE STYLING 
export default function InterviewerList(props) {
  const InterviewerList = props.interviewers.map((interviewer) =>
  <InterviewListItem 
  key= {interviewer.id}
  name={interviewer.name} 
  avatar={interviewer.avatar} 
  selected ={interviewer.id === props.value}
  setInterviewer={(event) =>props.onChange(interviewer.id)}  />
  )
  
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{InterviewerList}</ul>
  </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
