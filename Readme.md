# Swag Labs (Sauce Demo) - Playwright E2E Automation

Project ini adalah implementasi *Automated Testing* untuk alur e-commerce menggunakan **Playwright** dan **TypeScript**, dengan menerapkan arsitektur **Page Object Model (POM)**.

## 📂 Struktur Page Object
* `login.page.ts`: Menangani input kredensial dan otentikasi.
* `products.page.ts`: Menangani interaksi halaman inventori.
* `cart.page.ts`: Menangani validasi keranjang belanja.
* `checkout1.page.ts` & `checkout2.page.ts`: Menangani pengisian form data diri dan penyelesaian pesanan.

## 🧪 Test Cases (Skenario yang Diuji)

**[TC-001] End-to-End Checkout Flow (Sukses)**
* **Pre-condition:** User berada di halaman login.
* **Langkah-langkah:**
  1. Login menggunakan akun `standard_user`.
  2. Tambahkan 1 item ke dalam *cart* dari halaman *Products*.
  3. Buka halaman *Cart* dan klik *Checkout*.
  4. Isi nama depan, nama belakang, dan kode pos, lalu klik *Continue*.
  5. Validasi detail pesanan dan klik *Finish*.
* **Expected Result:** Muncul pesan sukses "Thank you for your order!".
* **Status Automation:** ✅ Selesai (`tests/checkout.spec.ts`)

## 🚀 Cara Menjalankan Script
1. Clone repo ini.
2. Jalankan `npm install`.
3. Jalankan `npx playwright test` untuk mode *headless*, atau `npx playwright test --ui` untuk melihat tampilan grafis.