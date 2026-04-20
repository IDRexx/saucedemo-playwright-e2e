import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page'

test.describe('Cart Persistence Test', () => {

  test('items tetap ada di cart setelah refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    // 1. Login menggunakan data dari .env

    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USER!, 
      process.env.SAUCE_PASSWORD!
    );
    // 2. Ambil semua tombol "Add to cart"
    const addToCartButtons = page.locator('button:has-text("Add to cart")');

    // Validasi minimal ada 2 item
    await expect(addToCartButtons.first()).toBeVisible();
    const jumlahTombol = await addToCartButtons.count();
    expect(jumlahTombol).toBeGreaterThan(1);

    // 3. Klik 2 item pertama (bisa random kalau mau advanced)
    await addToCartButtons.nth(0).click();
    await addToCartButtons.nth(1).click();

    // 4. Validasi badge cart = 2
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // 5. Refresh halaman
    await page.reload();

    // 6. Validasi badge tetap 2
    await expect(cartBadge).toHaveText('2');

    // 7. Validasi tombol berubah jadi "Remove"
    const removeButtons = page.locator('button:has-text("Remove")');

    // Harus ada 2 tombol remove
    await expect(removeButtons).toHaveCount(2);
  });

});