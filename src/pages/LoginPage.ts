import { Page, expect } from "@playwright/test";
import HomePage from "./HomePage";
//import logger from "../utils/LoggerUtil";
//import findValidElement from "../utils/SelfHealingUtill";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#Login";

  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto("/");
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
  }

  async clickLoginButton() {
    await this.page
      .locator(this.loginButtonSelector)
      .click()
      .catch((error) => {
        console.error(`Error clicking login button: ${error}`);
        throw error; // rethrow the error if needed
      });

    const homePage = new HomePage(this.page);
    return homePage;
  }
}