import { Page, Locator } from '@playwright/test';

export class Checkout2Page {
  readonly page: Page;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}