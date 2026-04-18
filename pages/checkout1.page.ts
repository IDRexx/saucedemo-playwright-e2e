import { Page, Locator } from '@playwright/test';

export class Checkout1Page {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Perhatikan huruf besar kecilnya (case-sensitive)
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // Method ini yang akan dipanggil di file Test (spec.ts)
  async fillInformation(fName: string, lName: string, zip: string) {
    await this.firstNameInput.fill(fName);
    await this.lastNameInput.fill(lName);
    await this.postalCodeInput.fill(zip);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
