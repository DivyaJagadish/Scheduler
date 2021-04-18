import React from "react";
import  { Fragment } from 'react'
import classNames  from "classnames";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import  Status  from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
let AppointmentClass = classNames({"appointment":true,"last-of-type":((props.id)=== "last")? true:false})

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM ="CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE ="ERROR_SAVE"
const ERROR_DELETE ="ERROR_DELETE"
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
  .then(()=>transition("SHOW"))
  .catch((err)=> transition("ERROR_SAVE",true));
}

function destroy() {
  transition(DELETING, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }

  return (
    <Fragment>
    <article className ={AppointmentClass}>  
    <Header  time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
    {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete ={()=>transition("CONFIRM")} onEdit ={()=>transition("EDIT")} />)}
    {mode === CREATE && <Form  interviewers = {props.interviewers} onSave = {save} onCancel ={()=>back()}/>}
    {mode === SAVING && <Status message ={"Saving"} />}
    {mode === DELETING && <Status message ={"Deleting"} />}
    {mode === CONFIRM && <Confirm  message = {"Are you sure you want to delete?"}onCancel= {()=>back()} onConfirm ={destroy}/>}
    {mode === EDIT && <Form  name = {props.interview.student} interviewers = {props.interviewers}  interviewer ={props.interview.interviewer.id} onSave = {save} onCancel ={()=>back()}/>}
    {mode === ERROR_SAVE && <Error message ={"Error :Cannot Save"} onClose ={()=>back()}/>}
    { mode === ERROR_DELETE && <Error message ={"ERROR :Cannot DElete"} onClose ={()=>back()}/>}
   </article>
   </Fragment>
  );
  }