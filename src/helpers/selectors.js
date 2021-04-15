

export function getAppointmentsForDay(state, day) {
  let arrayAppointments =[];
  let  dayappointmentArray =[];
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