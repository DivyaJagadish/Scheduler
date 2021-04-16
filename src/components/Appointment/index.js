import React from "react";
import  { Fragment } from 'react'
import classNames  from "classnames";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
  let AppointmentClass = classNames({"appointment":true,"last-of-type":((props.id)=== "last")? true:false})
  return (
    <Fragment>
    <article className ={AppointmentClass}>  
    <Header  time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
    {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer}/>)}
    {mode === CREATE && <Form  interviewers = {props.interviewers} onSave = {()=> console.log("onSave")} onCancel ={()=>back()}/>}
   </article>
   </Fragment>
  );
  }