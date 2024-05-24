import { test, expect, Locator } from '@playwright/test';

test('Проверка работы фильтрации по городам', async ({ page }) => {
  // Открываем страницу с карточками
  await page.goto('http://localhost:5173');

  const isActive = async (locator: Locator) => {
    const classList = await locator.evaluate((el) => [...el.classList]);
    return classList.includes('tabs__item--active');
  };

  await page.waitForSelector('.locations__item-link');

  for (const li of await page.locator('.locations__item-link').all()) {
    await li.click();
    const currentCity = await li.textContent();

    // Ожидаем перерисовки карточек после фильтрации
    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    // Кликаем на элемент
    const hasActiveClass = await isActive(li);
    expect(hasActiveClass).toBeTruthy();

    const placesFoundText = await page.locator('.places__found').textContent();

    // Получаем последнее слово из текста
    const lastWord = placesFoundText?.split(' ').pop();
    // Проверяем, что значение атрибута data-test равно последнему слову из places__found
    expect(currentCity).toBe(lastWord);
  }
});
