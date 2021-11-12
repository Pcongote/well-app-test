import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const url = "https://wellapp.com/";
const filepath = "cypress/fixtures/jobs.json";
const selectors = {
  WELLAPP: url,
  careers: ":nth-child(2) > #footer2 > .footer-list > :nth-child(1) > a",
  names: ".name",
  locations: ".location",
};

let jsonInfo = { results: [] };
let titlesTexts = [];
let locationsTexts = [];

Given("I open the web page {string}", (element) => {
  cy.visit(selectors[element]);
});

When("I click {string} Button", (element) => {
  cy.get(selectors[element]).click();
});

Then("I save all the jobs in the json file", () => {
  cy.get(selectors["names"]).then(($titles) => {
    cy.get(selectors["locations"]).then(($locations) => {
      titlesTexts = createArray($titles);
      locationsTexts = createArray($locations);

      for (let index = 0; index < titlesTexts.length; index++) {
        jsonInfo.results.push({
          title: titlesTexts[index],
          location: locationsTexts[index],
        });
      }

      cy.writeFile(filepath, jsonInfo);
    });
  });
});

function createArray(allElements) {
  return Array.from(allElements, (element) => element.innerText);
}
