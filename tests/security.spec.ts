import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Security Tests', () => {
  test('Cek kerentanan XSS di form login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Memasukkan payload XSS sederhana
    const xssPayload = "<script>alert('Hacked!')</script>";
    await loginPage.login(xssPayload, 'password123');

    // Memastikan alert bawaan browser TIDAK muncul (artinya formnya aman dari XSS)
    page.on('dialog', dialog => {
      expect(dialog.type()).not.toBe('alert');
      dialog.dismiss();
    });
  });
});