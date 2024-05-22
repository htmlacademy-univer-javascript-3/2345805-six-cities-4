import { test, expect } from '@playwright/test';

test('check loading and displaying cards from server', async ({ page }) => {
  // Открываем страницу с карточками
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  // Проверяем, что карточки загрузились и отобразились
  const cardElements = await page.$$('.cities__card');
  expect(cardElements.length).toBeGreaterThan(0); // Убедимся, что на странице есть хотя бы одна карточка
});
