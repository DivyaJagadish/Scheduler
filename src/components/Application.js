import React, { useState,useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index"


import { getAppointmentsForDay } from "helpers/selectors";
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
      console.log(all[2].data)
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}))
    });
    
  },[])
  const dailyAppointments = getAppointmentsForDay(state,state.day)
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
        {dailyAppointments.map((appointment) => 
        <Appointment key ={appointment.id} {...appointment} />)}
        <Appointment key ="last" time="5pm" />
      </section>
    </main>
    
  );
}
