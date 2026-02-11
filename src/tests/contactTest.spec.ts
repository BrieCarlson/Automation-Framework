import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import cdata from "../testdata/datademo.json";
import { convertCsvFileToJsonFile } from "../utils/CsvtoJsonUtil";

for (const contact of cdata) {
  test(`Advance DD test for ${contact.firstName} `, async ({ page }) => {
    logger.info("Test for Contact Creation is started...");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contact.firstName, contact.lastName);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(
      contact.firstName,
      contact.lastName
    );
    logger.info("Test for Contact Creation is completed");
  });
}

test.skip("simple DD test", async ({ page }) => {
  logger.info("Test for Contact Creation is started...");
  const fname = "Shiva";
  const lname = "Rudra";
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  const contactsPage = await homePage.navigateToContactTab();
  await contactsPage.createNewContact(fname, lname);
  await contactsPage.expectContactLabelContainsFirstNameAndLastName(
    fname,
    lname
  );
  logger.info("Test for Contact Creation is completed");
});

test("csv to json", async () => {
  convertCsvFileToJsonFile("data.csv", "datademo.json");
});


