import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.header__nav-link');
    const navigationLinkBtn = await page.$('.header__nav-link');
    const loginButton = await page.$('.header__login');

    if (!loginButton) {
      await navigationLinkBtn?.click();
    }

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

  test('should display error message with invalid password', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.header__nav-link');
    const navigationLinkBtn = await page.$('.header__nav-link');
    const loginButton = await page.$('.header__login');

    if (!loginButton) {
      await navigationLinkBtn?.click();
    }
    // Open the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form with invalid password
    await page.fill('input[name="email"]', 'example@example.com');
    await page.fill('input[name="password"]', 'ii');

    // Submit the form
    await page.click('button[type="submit"]'); // Клик по кнопке "Sign in"

    await page.waitForSelector('.Toastify__toast-body');

    // Check if the error message is displayed
    // const parentElement = await page.$('.Toastify__toast-body');
    // console.log(parentElement);
    // const childElement = await parentElement?.$('div');
    // expect(childElement).toBeTruthy();
    // const errorMessage = await childElement?.evaluate((el) => el.textContent);
    // console.log(childElement);
    // expect(errorMessage).toContain(
    //   'The password must consist of at least one English letter and one symbol without spaces.'
    // );

    const url = page.url();
    expect(url).toBe('http://localhost:5173/login');
  });
});
