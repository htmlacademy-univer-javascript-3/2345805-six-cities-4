import { test, expect } from '@playwright/test';

test.describe('Favourites', () => {
  test('Проверка работы Избранного (неавторизованный пользователь)', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');
    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    await page.locator('.bookmark-button').first().click();
    await page.waitForURL('http://localhost:5173/login');

    await page.goto('http://localhost:5173/favorites');
    await page.waitForURL('http://localhost:5173/login');
  });

  // test('Проверка работы Избранного (авторизованный пользователь)', async ({
  //   page,
  // }) => {
  //   await page.goto('http://localhost:5173/login');

  //   // Fill in the login form
  //   await page.fill('input[name="email"]', 'email@example.com');
  //   await page.fill('input[name="password"]', 'password123');

  //   // Submit the form
  //   await Promise.all([
  //     page.waitForURL('http://localhost:5173'), // Ожидание перехода после отправки формы
  //     page.click('button[type="submit"]'), // Клик по кнопке "Sign in"
  //   ]);

  //   await page.waitForSelector('.cities__card');

  //   const initialFavCounter = parseInt(
  //     (await page.locator('.header__favorite-count').textContent()) || '0'
  //   );

  //   const initialFavBtnClassList = await page
  //     .locator('.bookmark-button')
  //     .first()
  //     .evaluate((el) => [...el.classList]);
  //   const wasActive = initialFavBtnClassList.includes(
  //     'place-card__bookmark-button--active'
  //   );
  //   console.log(initialFavBtnClassList, wasActive);
  //   page.locator('.bookmark-button').first().click();

  //   const favBtnClassList = await page
  //     .locator('.bookmark-button')
  //     .first()
  //     .evaluate((el) => [...el.classList]);
  //   const isSelected = favBtnClassList.includes(
  //     'place-card__bookmark-button--active'
  //   );

  //   if (wasActive) {
  //     expect(isSelected).toBeFalsy();
  //     expect(initialFavCounter).toEqual(initialFavCounter - 1);
  //   } else {
  //     expect(isSelected).toBeTruthy();
  //     expect(initialFavCounter).toEqual(initialFavCounter + 1);
  //   }
  // });
});
