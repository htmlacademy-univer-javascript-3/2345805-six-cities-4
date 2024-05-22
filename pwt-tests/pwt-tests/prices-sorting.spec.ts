import { test, expect } from '@playwright/test';

test('check sorting of cards by price', async ({ page }) => {
  // Открываем страницу с карточками
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  // Получаем цены всех карточек до сортировки
  const pricesBeforeSorting = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  // Сортируем цены карточек в порядке возрастания
  const sortedPricesUp = [...pricesBeforeSorting].sort((a, b) => a - b);
  // Сортируем цены карточек в порядке убывания
  const sortedPricesDown = [...pricesBeforeSorting].sort((a, b) => b - a);

  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');

  // Ожидаем перерисовки карточек после сортировки
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Получаем цены всех карточек после сортировки
  const pricesAfterSortingUp = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');

  // Ожидаем перерисовки карточек после сортировки
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Получаем цены всех карточек после сортировки
  const pricesAfterSortingDown = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  // Проверяем, что цены карточек после сортировки совпадают с ожидаемым порядком
  expect(pricesAfterSortingUp).toEqual(sortedPricesUp);
  expect(pricesAfterSortingDown).toEqual(sortedPricesDown);
});
