import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Appointment/styles.scss";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  //Function for validate the stundent Input
  function validate() {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer not selected");
      return;
    }

    setError("");
    if (interviewer) {
      props.onSave(name, interviewer);
    }
  }
  const reset = function () {
    setName("");
    setInterviewer(null);
  };
  const cancel = function () {
    reset();
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            /*
          This must be a controlled component
        */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
