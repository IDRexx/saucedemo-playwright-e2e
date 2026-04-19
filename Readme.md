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

---

### 🧪 [TC-002] Negative Login Scenarios
* **Deskripsi:** Memvalidasi bahwa sistem menangani input login yang tidak valid dengan memunculkan pesan error yang sesuai.
* **Pre-condition:** User berada di halaman login.
* **Langkah-langkah & Expected Result:**
  1. Login dengan *username* kosong & *password* benar ➡️ Muncul error "Epic sadface: Username is required".
  2. Login dengan *username* benar & *password* salah ➡️ Muncul error "Epic sadface: Username and password do not match...".
  3. Login dengan *password* melebih batas karakter ➡️ Muncul error validasi.
  4. Login dengan *username* melebih batas karakter ➡️ Muncul error validasi.
  5. Login dengan akun tidak terdaftar (unknown user) ➡️ Muncul error "Epic sadface: Username and password do not match...".
* **Status Automation:**  Done (`tests/login.spec.ts`)

---

### 🛡️ [TC-003] Security Test - Basic XSS Injection
* **Deskripsi:** Memastikan kolom input pada form login aman dari serangan injeksi script dasar (Cross-Site Scripting).
* **Pre-condition:** User berada di halaman login.
* **Langkah-langkah:**
  1. Masukkan payload XSS `<script>alert('Hacked!')</script>` pada kolom *username*.
  2. Masukkan teks *random* pada kolom *password*.
  3. Klik tombol Login.
* **Expected Result:** * Browser tidak mengeksekusi script (TIDAK muncul *popup alert*).
  * Sistem menangani input tersebut sebagai *string* biasa dan memunculkan pesan error *login* standar.
* **Status Automation:**  Done (`tests/security.spec.ts`)

----

### 📊 [TC-004] Product Sorting Validation (Low to High)
* **Deskripsi:** Memvalidasi fitur filter harga bekerja dengan benar dan menampilkan item dari harga termurah hingga termahal.
* **Pre-condition:** User berhasil login dan berada di halaman Inventory/Products.
* **Langkah-langkah:**
  1. Klik dropdown filter (sort).
  2. Pilih opsi "Price (low to high)".
  3. Ekstrak seluruh harga item yang tampil di layar ke dalam bentuk Array angka.
* **Expected Result:** Array harga harus berurutan secara *ascending* (contoh: 7.99, 9.99, 15.99).
* **Status Automation:**  Done (`tests/inventory.spec.ts`)

---

### 🛒 [TC-005] Cart State Persistence
* **Deskripsi:** Memastikan item di dalam keranjang belanja tidak hilang ketika user melakukan refresh halaman.
* **Pre-condition:** User berhasil login dan berada di halaman Inventory.
* **Langkah-langkah:**
  1. Klik "Add to cart" pada 2 item acak.
  2. Validasi ikon keranjang (badge) menunjukkan angka 2.
  3. Refresh halaman browser (F5 / Reload).
* **Expected Result:** Ikon keranjang tetap menunjukkan angka 2 dan status tombol pada item tetap "Remove".
* **Status Automation:** ⏳ To Do (`tests/cart.spec.ts`)

## 🚀 Cara Menjalankan Script
1. Clone repo ini.
2. Jalankan `npm install`.
3. Jalankan `npx playwright test` untuk mode *headless*, atau `npx playwright test --ui` untuk melihat tampilan grafis.