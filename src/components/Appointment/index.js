import React from "react";
import  { Fragment } from 'react'
import classNames  from "classnames";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  let AppointmentClass = classNames({"appointment":true,"last-of-type":((props.id)=== "last")? true:false})
  return (
    <Fragment>
    <article className ={AppointmentClass}>  
    <Header  time = {props.time}/>
    {(props.interview) ?  <Show  student = {props.interview.student} interviewer ={props.interview.interviewer}/> :<Empty/>}
   </article>
   </Fragment>
  );
  }