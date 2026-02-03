import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


test("test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername("briecarlson1992.1abd8892032e@agentforce.com");
  await loginPage.fillPassword("Telina26")

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});
