import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page'
import { Checkout1Page } from '../pages/checkout1.page';
import { Checkout2Page } from '../pages/checkout2.page';

test.describe('E-Commerce Flow', () => {
  
  test('User harus bisa beli barang sampai checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkout1Page = new Checkout1Page(page);
    const checkout2Page = new Checkout2Page(page);

    // 1. Login menggunakan data dari .env
    await loginPage.goto();
    await loginPage.login(
      process.env.SAUCE_USER!, 
      process.env.SAUCE_PASSWORD!
    );

    // 2. Add to Cart
    await productsPage.addFirstItemToCart();

    // 3. Verifikasi (Assertion)
    // Cek apakah angka di keranjang berubah jadi 1
    await expect(productsPage.shoppingCartBadge).toHaveText('1');
    await page.locator('.shopping_cart_link').click(); 
    // B. Klik tombol checkout di halaman keranjang
    await page.locator('[data-test="checkout"]').click();

    //4.isi data diri
    await checkout1Page.fillInformation('yahwa', 'nana', '16123');
    await checkout1Page.clickContinue()

    //5.Finish checkout
    await checkout2Page.clickFinish();

    //Assertion test(Assertion)
    const successMessage = page.locator('.complete-header');
    await expect(successMessage).toHaveText('Thank you for your order!');
    
    console.log('Test Berhasil!');
  });
});