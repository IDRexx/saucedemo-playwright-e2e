import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  // 1. Daftar "Nama Tombol" dan tipenya (Locator)
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    // 2. Isi "Alamat/KTP" si tombol tadi (Selector-nya)
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItemName = page.locator('.inventory_item_name');
  }

  // 3. Bikin Method (Aksinya)
  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
