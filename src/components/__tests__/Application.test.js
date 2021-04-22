import React from "react";
import { render, waitForElement, cleanup, fireEvent, queryByText, queryAllByAltText } from "@testing-library/react";
import { getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";
jest.mock('axios') //mock Axios

describe("Application", () => {
  beforeEach(() => {
    cleanup();
    jest.resetModules();
  });

  test("defaults to Monday and changes the schedule when a new day is selected", () => {
    // Renders Application
    const { getByText } = render(<Application />);

    //Waits for completion of async operation and then click Tuesday
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  test("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    // Awaits for complete rendering and searches "Archie Cohen"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get the first empty appontment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Clicks on Add
    fireEvent.click(getByAltText(appointment, "Add"));

    //Checks whether form element is rendered and writes the student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //Select the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Clicks on Save
    fireEvent.click(getByText(appointment, "Save"));

    // Checks the status message Saving is rendered or not
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for the Show element is being rendered
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // checks whether the spots are being updated
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });


  test("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryAllByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
   });


  test("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

   // 1. Render the Application.
   const { container, debug } = render(<Application />);

   // 2. Wait until the text "Archie Cohen" is displayed.

   await waitForElement(() => getByText(container, "Archie Cohen"));
   const appointments = getAllByTestId(container, "appointment");
   const appointment = appointments[1];

   // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4.Enter the new data in placeholder of Form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5.Enter the value of Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Enter the value and Press Save
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check for the Status message of Saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // 8. checks whether the spots are being updated
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  it("shows the save error when failing to save an appointment", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

   // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Mock axios.put rejectedValue()
    axios.put.mockRejectedValueOnce();

   // 5. Enter the new Value of student name and Interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6.Click on Save
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Find the status saving in the DOM
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Check for Error Status
    await waitForElement(() => getByText(appointment, "Error"));

    // 9. Click on Close  button
    fireEvent.click(getByAltText(appointment, "Close"));

    // 10.Renders the Form element 
    await waitForElement(() => getByPlaceholderText(appointment, /enter student name/i));

    // 11. Check for the updation of Spots.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });



  test("shows the delete error when failing to delete an existing appointment", async () => {
    // 1.Renders the Component 
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));


    // 3. Click the "delete" button on the booked appointment.
    axios.delete.mockRejectedValueOnce();
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4.Check for the Status message 

    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5.click on Confirm button
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6.Check for status with message Deleting
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check for Rendering Error
    await waitForElement(() => getByText(appointment, "Error"));
    fireEvent.click(getByAltText(appointment, "Close"));

    // 8. Check whether it renders back to Show component
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 9.Checks whether update Spots 
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });




});