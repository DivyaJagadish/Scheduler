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
  function spotsremaining (value){
    for (const element of state.days){
      if (element.name === state.day) {
     
        element.spots +=value;
      }
    } 
  };
//need to implement for edit

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
 
   
    spotsremaining(-1);
   
  console.log(state);
   const days =[
    ...state.days
  ]
    return axios.put(`/api/appointments/${id}`,{interview})
    .then( setState(prev => ({ ...prev,appointments,days})));
  }

  function cancelInterview(id){
    spotsremaining(1);
    const days =[
      ...state.days
    ]
    return axios.delete(`/api/appointments/${id}`)
    .then(()=>setState(prev => ({...prev,days})));
  }

return{state,setDay,bookInterview,cancelInterview} 
}