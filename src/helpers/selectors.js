
// Function to get the appointments array  of appointments for a day
export  function getAppointmentsForDay(state, day) {
  let arrayAppointments =[];
  let  dayappointmentArray =[];
  // Finds the appointments array for a day
  dayappointmentArray = state.days.filter(day1 => day1.name === day);
    if(dayappointmentArray.length > 0)
    for (const element of dayappointmentArray[0].appointments ){
      for (const value in state.appointments) {
        if (element === state.appointments[value].id){
          arrayAppointments.push(state.appointments[value]);
        }
      }
    }
  return arrayAppointments;
}

// Helper to getInterview returns the interview object
export  function getInterview(state, interview) {
if(interview){
  for ( const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer){
      interview["interviewer"] = state.interviewers[interviewer];
      break;
    }
  }
}
  return interview;
}


//Returns array of interviewers for the day

export  function getInterviewersForDay(state, day) {
  let arrayInterviewers =[];
  let  dayInterviewersArray =[];
  dayInterviewersArray = state.days.filter(day1 => day1.name === day);
    if(dayInterviewersArray.length > 0)
    for (const element of dayInterviewersArray[0].interviewers ){
      for (const value in state.interviewers) {
        if (element === state.interviewers[value].id){
          arrayInterviewers.push(state.interviewers[value]);
        }
      }
    }
  return arrayInterviewers;
}