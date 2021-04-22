const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Appointment", ()=>{
  // beforeEach(()=>{
  //   cy.visit("/api/debug/reset");
  // });
  it ("should book an interview",()=>{
    cy.request("GET", "http://localhost:8001/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday")
    cy.get("[alt=Add]")
    .first()
    .click();
    cy.get("[data-testid=student-name-input]")
    .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
    .click();
    cy.contains("Save")
    .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
cy.contains(".appointment__card--show", "Sylvia Palmer");
  })

})