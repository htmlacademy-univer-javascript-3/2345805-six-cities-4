import { test, expect } from '@playwright/test';

test('test bookmark button redirects to login', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (!loginButton) {
    await navigationLinkBtn?.click();
  }
  await page.waitForSelector('.bookmark-button');
  const bookmarkButton = await page.$('.bookmark-button');

  await Promise.all([
    page.waitForURL('http://localhost:5173/login'),
    bookmarkButton?.click(),
  ]);

  await page.goto('http://localhost:5173');

  const citiesCard = await page.$('.cities_card');
  await citiesCard?.click();

  await page.waitForSelector('.bookmark-button');
  const bookmarkButtonInsideCard = await page.$('.bookmark-button');

  await Promise.all([
    page.waitForURL('http://localhost:5173/login'),
    bookmarkButtonInsideCard?.click(),
  ]);
});

test('test bookmark with signed in', async ({ page }) => {
  //процесс входа в профиль
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (loginButton) {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Ожидание перехода после отправки формы
      page.click('button[type="submit"]'), // Клик по кнопке "Sign in"
    ]);
  }

  // чистим избранное
  await page.goto('http://localhost:5173/favorites');

  const clickAllBookmarkButtons = async () => {
    await page.waitForTimeout(500);
    const bookmarkButtons = await page.$$('.bookmark-button');

    for (const button of bookmarkButtons) {
      await button.click();

      await page.waitForTimeout(500);
    }
  };

  while ((await page.$('.bookmark-button')) !== null) {
    await clickAllBookmarkButtons();
  }

  expect(await page.$('.bookmark-button')).toBeNull();

  // основная часть

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  await page.waitForSelector('.bookmark-button');
  const bookmarkButtons = await page.$$('.bookmark-button');

  await bookmarkButtons[0].click();
  await page.waitForTimeout(2000);

  const favCounter = page.locator('.header__favorite-count');
  const firstFav = await favCounter.textContent();
  expect(firstFav).not.toBe('0');

  const citiesCards = await page.$$('.cities__card');
  await citiesCards[2].click();

  await page.waitForSelector('.offer__container');
  const bookmarkButtonInsideCard = await page.$('.bookmark-button');
  await bookmarkButtonInsideCard?.click();
  await page.waitForTimeout(2000);

  const newFavCounter = page.locator('.header__favorite-count');
  const newFav = await newFavCounter.textContent();
  console.log(firstFav, newFav);
  const parsedFav = parseFloat(newFav ?? '0');
  const expectFav = parseFloat(firstFav ?? '0') + 1;
  expect(parsedFav).toBe(expectFav);
});
