import React from "react";
import  { Fragment } from 'react'
import classNames  from "classnames";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import  Status  from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"

export default function Appointment(props) {
let AppointmentClass = classNames({"appointment":true,"last-of-type":((props.id)=== "last")? true:false})

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM ="CONFIRM";
// const EDIT = "EDIT";
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition("SAVING");
  props.bookInterview(props.id,interview)
  .then(()=>transition("SHOW"));
}

function deleteInterview() {
  const interview = null;
  transition("DELETING")
  // props.cancelInterview(props.id,interview)
  // .then(transition("EMPTY"));

};
// onDelete ={deleteInterview}
  return (
    <Fragment>
    <article className ={AppointmentClass}>  
    <Header  time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
    {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete ={()=>transition("CONFIRM")} onEdit ={()=>transition("EDIT")} />)}
    {mode === CREATE && <Form  interviewers = {props.interviewers} onSave = {save} onCancel ={()=>back()}/>}
    {mode === SAVING && <Status message ={"Saving"} />}
    {mode === DELETING && <Status message ={"Deleting"} />}
    {mode === CONFIRM && <Confirm  message = {"Are you sure you want to delete?"}onCancel= {()=>back()} onConfirm ={()=> {deleteInterview() }}/>}
    {/* {mode === EDIT && <Form  name = {props.interview.student} interviewers = {props.interviewers}  interviewer ={props.interview.interviewer} onSave = {save} onCancel ={()=>back()}/>} */}
   </article>
   </Fragment>
  );
  }