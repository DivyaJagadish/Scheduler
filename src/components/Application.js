import React, { useState,useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index"


import { getAppointmentsForDay,getInterview,getInterviewersForDay } from "helpers/selectors";
export default function Application(props) {
  const setDay = day =>setState(prev => ({ ...prev, day }));;
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers :{}
  });
   
  useEffect(()=>{
    const dayspromise = axios.get("http://localhost:8001/api/days");
    const appointmentpromise = axios.get("http://localhost:8001/api/appointments")
    const interviewerspromise = axios.get("http://localhost:8001/api/interviewers")
    Promise.all([dayspromise,appointmentpromise,interviewerspromise])
    .then ((all)=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}))
    });
    
  },[])
  const appointments = getAppointmentsForDay(state,state.day)
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state,state.day);
  function bookInterview(id, interview) {
    console.log(id, interview);
  }
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers ={interviewers}
        bookInterview ={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={state.days}
  day= {state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key ="last" time="5pm" />
      </section>
    </main>
    
  );
}
