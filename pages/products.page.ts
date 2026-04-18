import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartBackpack: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async addFirstItemToCart() {
    await this.addToCartBackpack.click();
  }
}