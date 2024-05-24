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

  test('Проверка работы Избранного (авторизованный пользователь)', async ({
    page,
  }) => {
    const isFavSelected = async () => {
      const favBtnClassList = await page
        .locator('.bookmark-button')
        .first()
        .evaluate((el) => [...el.classList]);
      return favBtnClassList.includes('place-card__bookmark-button--active');
    };

    const getFavCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Ожидание перехода после отправки формы
      page.click('button[type="submit"]'), // Клик по кнопке "Sign in"
    ]);

    await page.waitForSelector('.cities__card');

    const initialFavCounter = await getFavCount();

    const wasActive = await isFavSelected();

    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() === (wasActive ? 200 : 201)
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    const isActive = await isFavSelected();
    const changedFavCounter = await getFavCount();

    if (wasActive) {
      expect(isActive).toBeFalsy();
      expect(changedFavCounter).toEqual(initialFavCounter - 1);
    } else {
      expect(isActive).toBeTruthy();
      expect(changedFavCounter).toEqual(initialFavCounter + 1);
    }
  });
});
