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
    const dayspromise = axios.get("http://localhost:8001/api/days");
    const appointmentpromise = axios.get("http://localhost:8001/api/appointments")
    const interviewerspromise = axios.get("http://localhost:8001/api/interviewers")
    Promise.all([dayspromise,appointmentpromise,interviewerspromise])
    .then ((all)=>{
    setState(prev =>({...prev, days:all[0].data, appointments: all[1].data, interviewers:all[2].data}))
    });
    
  },[])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`,{interview})
    .then( setState(prev => ({ ...prev,appointments})));
  }
  
  function cancelInterview(id){
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>setState(prev => (prev)));
  }

return{state,setDay,bookInterview,cancelInterview} 
}