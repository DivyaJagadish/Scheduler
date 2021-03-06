import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";

afterEach(cleanup);

it("renders without crashing", () => {
  // check if it renders  Appointment 
  render(<Appointment 
    key={1}
    id={2}
    time={"1.00 p.m"}
    interview={ { student: 'Archie Cohen',
    interviewer:
     { id: 2,
       name: 'Tori Malcolm',
       avatar: 'https://i.imgur.com/Nmx0Qxo.png' } }}
    interviewers ={[ { id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png' },
    { id: 2,
      name: 'Tori Malcolm',
      avatar: 'https://i.imgur.com/Nmx0Qxo.png' } ]}
    bookInterview ={()=>{}}
    cancelInterview ={()=>{}}/>);
});
