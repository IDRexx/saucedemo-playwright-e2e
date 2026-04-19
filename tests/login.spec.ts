import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Negative Cases', () => {
  let loginPage: LoginPage;

  // beforeEach akan jalan otomatis sebelum setiap test dimulai
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login gagal - username kosong', async () => {
    await loginPage.login('', process.env.SAUCE_PASSWORD!);
    await expect(loginPage.errorMessage).toBeVisible();
    // Opsional tapi sangat disarankan: Cek teks error yang tepat
    // await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('Login gagal - password salah', async () => {
    await loginPage.login(process.env.SAUCE_USER!, 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    // await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login gagal - password terlalu panjang', async () => {
    const longPassword = 'a'.repeat(50);
    await loginPage.login(process.env.SAUCE_USER!, longPassword);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Login gagal - username terlalu panjang', async () => {
    const longUsername = 'user'.repeat(20);
    await loginPage.login(longUsername, process.env.SAUCE_PASSWORD!);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Login gagal - akun tidak terdaftar', async () => {
    await loginPage.login('unknown_user', 'random_password');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});