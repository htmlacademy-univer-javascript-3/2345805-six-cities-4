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

    const expectedFavCities = ['Paris', 'Cologne'];

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

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/favorite') && resp.status() === 201
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    const isActive = await isFavSelected();
    const changedFavCounter = await getFavCount();

    expect(isActive).toBeTruthy();
    expect(changedFavCounter).toEqual(initialFavCounter + 1);

    await page.getByTestId('Cologne').click();

    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/favorite') && resp.status() === 201
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    await Promise.all([
      page.waitForURL('http://localhost:5173/favorites'),
      page.getByRole('link', { name: 'email@example.com' }).click(),
    ]);

    await page.waitForSelector(`.favorites__list`);

    const favCardCities = await page
      .locator('.locations__item-link')
      .allTextContents();

    for (let i = 0; i < favCardCities.length; i += 1) {
      expect(favCardCities[i]).toBe(expectedFavCities[i]);
    }

    const favouritesCardsNumber = (
      await page.locator('.locations__item-link').all()
    ).length;
    const lastFavCounter = await getFavCount();
    expect(favouritesCardsNumber).toBe(lastFavCounter);

    let clicksCount = 0;
    while (clicksCount < favouritesCardsNumber) {
      clicksCount++;
      await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes('/favorite') && resp.status() === 200
        ),
        page.locator('.bookmark-button').first().click(),
      ]);
    }

    await page.isVisible("text='Nothing yet saved.'");
  });
});
