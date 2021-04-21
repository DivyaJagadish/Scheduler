import { useState,useEffect } from "react";
import axios from "axios";


export  default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers :{}
  });
  const setDay = day =>setState(prev => ({ ...prev, day }));;
 

  useEffect(()=>{
    const dayspromise = axios.get("/api/days");
    const appointmentpromise = axios.get("/api/appointments")
    const interviewerspromise = axios.get("/api/interviewers")
    Promise.all([dayspromise,appointmentpromise,interviewerspromise])
    .then ((all)=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}))
    

    });
  },[])
  function spotsremaining (value){
    const newdays = [...state.days]
    for (const index in state.days){
      if (state.days[index].name === state.day) {
        newdays[index] = {...state.days[index]}
        newdays[index].spots +=value; 
      }
    }  return newdays;
  };
//need to implement for edit

  function bookInterview(id, interview) {
    let days =[
      ...state.days
    ]
    console.log(state.appointments[id].interview )
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

  function cancelInterview(id){
    let days =[
      ...state.days
    ]
   days = spotsremaining(1);
    // const newappointments = {...state.appointments}
    // newappointments[id].interview = null;
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then((results)=>{console.log(state)})
    .then(()=>setState(prev => ({...prev,appointments,days})));
  }

return{state,setDay,bookInterview,cancelInterview} 
}