import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page'

test.describe('E-Com  merce Flow', () => {
  
  test('User harus bisa sort harga dari low ke high', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    // 1. Login menggunakan data dari .env
    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USER!, 
      process.env.SAUCE_PASSWORD!
    );

    //2. sort bagian product pages
    await productsPage.sortByLowToHigh();

    //3. Ambil semua harga 
    const actualPrices = await productsPage.getAllPrices();

    //4. Expected sorted version
    const sortedPrice = [...actualPrices].sort((a, b) => a - b);

    //5. assertion
    expect(actualPrices).toEqual(sortedPrice);
  });    
});
