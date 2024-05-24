import { test, expect } from '@playwright/test';

test('Проверка загрузки карточек на главной странице', async ({ page }) => {
  // Открываем страницу с карточками
  page.waitForResponse(
    (resp) => resp.url().includes('/offers') && resp.status() === 200
  );

  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');

  const cardTitles = await page.getByTestId('cardTitle').allInnerTexts();

  expect(cardTitles.length).toBeGreaterThan(0);
  cardTitles.forEach((title) => title.length > 5);
});
