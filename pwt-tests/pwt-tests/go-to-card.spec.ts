import { test, expect } from '@playwright/test';

test('check navigation to card details page and card details match', async ({
  page,
}) => {
  await page.goto('http://localhost:5173');

  // Ожидаем загрузки карточек
  await page.waitForSelector('.cities__card');

  // Находим первую карточку
  const firstCard = await page.$('.cities__card');

  // Получаем часть значения атрибута href из ссылки внутри карточки
  const hrefAttributeValue = await firstCard?.$eval('a', (el) => {
    const href = el.getAttribute('href');
    return href ? href.split('/').pop() : '';
  });

  // Находим первую карточку и запоминаем ее название и цену
  const firstCardName = await firstCard?.$eval('.place-card__name a', (el) =>
    el.textContent?.trim()
  );
  const firstCardPrice = await firstCard?.$eval(
    '.place-card__price-value',
    (el) => el.textContent?.trim()
  );

  // Кликаем на первую карточку
  await firstCard?.click();

  // Ждем перехода на новую страницу
  await page.waitForSelector('.offer__gallery');

  // Получаем текущий URL страницы без исходной части
  const currentUrl = page.url().replace('http://localhost:5173/', '');

  // Проверяем, что URL страницы после перехода содержит часть, соответствующую href первой карточки
  expect(currentUrl).toContain(hrefAttributeValue);

  // Проверяем, что название и цена первой карточки на странице с деталями совпадают с теми, что мы запомнили ранее
  const cardDetailsName = await page.$eval('.offer__name', (el) =>
    el.textContent?.trim()
  );
  const cardDetailsPrice = await page.$eval('.offer__price-value', (el) =>
    el.textContent?.trim()
  );

  expect(cardDetailsName).toBe(firstCardName);
  expect(cardDetailsPrice).toBe(firstCardPrice);
});
