import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index"
import useApplicationData from "hooks/useApplicationData"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
export default function Application(props) {
  // Custom Hook to setDay BookInterview, CancelInterview
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // Helper function which returns daily Appountments for the specific day
  const appointments = getAppointmentsForDay(state, state.day)

  // Maps Appointment array 
  const schedule = appointments.map((appointment) => {
    // get the Interview for Day
    const interview = getInterview(state, appointment.interview);
    // Returns array of interviewers for the day
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>

  );
}
