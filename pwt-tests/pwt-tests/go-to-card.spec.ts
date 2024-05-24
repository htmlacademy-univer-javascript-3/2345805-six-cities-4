import { test, expect } from '@playwright/test';

test('Проверка перехода на страницу карточки', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  // Находим первую карточку и запоминаем ее название и цену
  const firstCardName = await page
    .getByTestId('cardTitle')
    .first()
    .textContent();
  const firstCardPrice = await page
    .locator('.place-card__price-value')
    .first()
    .textContent();

  // Кликаем на первую карточку
  await page.locator('.cities__card').first().click();

  // Ждем перехода на новую страницу
  await page.waitForSelector('.offer__gallery');

  // Проверяем, что название и цена первой карточки на странице с деталями совпадают с теми, что мы запомнили ранее
  const cardDetailsName = await page.locator('.offer__name').textContent();
  const cardDetailsPrice = await page
    .locator('.offer__price-value')
    .textContent();

  expect(cardDetailsName).toBe(firstCardName);
  expect(cardDetailsPrice).toBe(firstCardPrice);

  const offerDetails = await page.locator('.offer__inside-item').all();
  expect(offerDetails.length).toBeGreaterThan(0);
});
