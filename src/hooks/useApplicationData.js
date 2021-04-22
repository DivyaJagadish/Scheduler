import { useState,useEffect } from "react";
import axios from "axios";

// custom Hook
export  default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers :{}
  });
  const setDay = day =>setState(prev => ({ ...prev, day }));;
 
  //  uses API to load data from API

  useEffect(()=>{
    const dayspromise = axios.get("/api/days");
    const appointmentpromise = axios.get("/api/appointments")
    const interviewerspromise = axios.get("/api/interviewers")
    Promise.all([dayspromise,appointmentpromise,interviewerspromise])
    .then ((all)=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}))
    });
  },[])

  // Function to update the spots of the day after add, Delete
  function spotsremaining (value){
    const newdays = [...state.days]
    for (const index in state.days){
      if (state.days[index].name === state.day) {
        newdays[index] = {...state.days[index]}
        newdays[index].spots +=value; 
      }
    }  return newdays;
  };

//Function to booKInterview on a particular appointment
  function bookInterview(id, interview) {
    let days =[
      ...state.days
    ]
    console.log(state.appointments[id].interview )

    // Checks whether the edit or add if edit thenit will not be null
    if(state.appointments[id].interview === null){
      days = spotsremaining(-1);
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`,{interview})
    .then( setState(prev => ({ ...prev,appointments,days})));
  }

  // Function to Delete Interview 
  function cancelInterview(id){
    let days =[
      ...state.days
    ]

    // updates spots after deletion
   days = spotsremaining(1);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // deletes the particular appointment as per day
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>setState(prev => ({...prev,appointments,days})));
  }

return{state,setDay,bookInterview,cancelInterview} 
}