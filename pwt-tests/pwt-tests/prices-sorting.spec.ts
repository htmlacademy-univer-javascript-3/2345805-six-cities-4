import { test, expect } from '@playwright/test';

test('Проверка сортировки карточек по стоимости', async ({ page }) => {
  // Открываем страницу с карточками
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  // Получаем цены всех карточек до сортировки
  const pricesBeforeSorting = await page
    .locator('place-card__price-value')
    .allTextContents();

  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');

  // Ожидаем перерисовки карточек после сортировки
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesAfterSortingUp = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesAfterSortingUp.length - 1; i++) {
    expect(pricesAfterSortingUp[i + 1]).toBeGreaterThanOrEqual(
      pricesAfterSortingUp[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');

  // Ожидаем перерисовки карточек после сортировки
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesAfterSortingDown = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  for (let i = 0; i < pricesAfterSortingDown.length - 1; i++) {
    expect(pricesAfterSortingDown[i + 1]).toBeLessThanOrEqual(
      pricesAfterSortingDown[i]
    );
  }

  await page.click('.places__sorting-type');
  await page.click('text="Popular"');

  // Ожидаем перерисовки карточек после сортировки
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  const pricesAfterSorting = await page
    .locator('place-card__price-value')
    .allTextContents();

  for (let i = 0; i < pricesAfterSorting.length; i++) {
    pricesAfterSorting[i] === pricesBeforeSorting[i];
  }
});
