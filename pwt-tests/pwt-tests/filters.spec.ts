import { test, expect } from '@playwright/test';

test('check filtering of cards', async ({ page }) => {
  // Открываем страницу с карточками
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  const locations = await page.$$('.locations__item-link');
  for (const location of locations) {
    // Получаем значение атрибута data-test
    const dataTestValue = await location.getAttribute('data-test');

    // Кликаем на элемент
    await location.click();

    // Ждем, чтобы страница обновилась
    await page.waitForSelector('.places__found', { state: 'attached' });
    // Ожидаем перерисовки карточек после фильтрации
    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    const placesFoundText = await page.$eval('.places__found', (el) =>
      el.textContent?.trim()
    );

    // Получаем последнее слово из текста
    const lastWord = placesFoundText?.split(' ').pop();

    // Проверяем, что значение атрибута data-test равно последнему слову из places__found
    expect(dataTestValue).toBe(lastWord);
  }
});
