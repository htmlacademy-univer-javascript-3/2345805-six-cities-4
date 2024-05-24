import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('Успешная авторизация', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Ожидание перехода после отправки формы
      page.click('button[type="submit"]'), // Клик по кнопке "Sign in"
    ]);
  });

  test('Ошибка авторизации (невалидный пароль)', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // Fill in the login form with invalid password
    await page.fill('input[name="email"]', 'example@example.com');
    await page.fill('input[name="password"]', 'ii');

    // Submit the form
    await page.click('button[type="submit"]'); // Клик по кнопке "Sign in"

    await page.isVisible(
      "text='The password must consist of at least one English letter and one symbol without spaces.'"
    );

    expect(page.url()).toBe('http://localhost:5173/login');
  });
});
