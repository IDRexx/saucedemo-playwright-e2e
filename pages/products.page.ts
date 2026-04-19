import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartBackpack: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async addFirstItemToCart() {
    await this.addToCartBackpack.click();
  }

   async sortByLowToHigh() {
    await this.sortDropdown.selectOption('lohi'); 
    // value "lohi" ini sesuai SauceDemo
  }

  async getAllPrices(): Promise<number[]> {
    const pricesText = await this.itemPrices.allTextContents();

    // contoh "$7.99" → 7.99
    return pricesText.map(text => parseFloat(text.replace('$', '')));
  } 
}