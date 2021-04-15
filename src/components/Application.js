import React, { useState,useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Amy Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Jones Pillai",
      interviewer:{ 
         id: 5,
         name: "Sven Jones",
          avatar: "https://i.imgur.com/twYrpay.jpg" 
        }
  }
  }
];

export default function Application(props) {
  const setDay = day =>setState(prev => ({ ...prev, day }));;
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
};
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  useEffect(()=>{
    axios.get("http://localhost:8001/api/days")
    .then((result)=>{
      console.log(result);
    setDays(result.data);
    })
  },[])

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
        {appointments.map((appointment) => 
        <Appointment key ={appointment.id} {...appointment} />)}
        <Appointment key ="last" time="5pm" />
      </section>
    </main>
    
  );
}
