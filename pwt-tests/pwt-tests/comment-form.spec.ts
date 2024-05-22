import { test, expect } from '@playwright/test';

test('comment submission form functionality (signed in)', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (loginButton) {
    // Если есть элемент для входа, кликаем на него
    await navigationLinkBtn?.click();
  } else {
    // Если нет элемента для входа, ищем элемент для выхода и кликаем на него
    await navigationLinkBtn?.click();

    // Ждем некоторое время, чтобы страница обновилась после выхода
    await page.waitForTimeout(2000);

    await page.goto('http://localhost:5173/login');
  }

  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', 'email@example.com');
  await page.fill('input[name="password"]', 'password123');

  await Promise.all([
    page.waitForURL('http://localhost:5173'),
    page.click('button[type="submit"]'),
  ]);

  await page.waitForSelector('.cities__card');
  const firstCard = await page.$('.cities__card');
  await firstCard?.click();
  await page.waitForSelector('.offer__gallery');

  const commentForm = await page.$('.reviews__form');
  expect(commentForm).toBeTruthy();

  const reviewText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  await page.fill('[name="review"]', reviewText);

  const ratingInputs = await page.$$('.form__rating-label');
  const selectedRating = ratingInputs[0];
  await selectedRating.click();

  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);

  const newReview = await page.$('.reviews__item');

  const newReviewText = await newReview?.$eval('.reviews__text', (el) =>
    el.textContent?.trim()
  );

  expect(newReviewText).toBe(reviewText);
});

test('comment submission form functionality (signed up)', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (!loginButton) {
    await Promise.all([
      page.waitForURL('http://localhost:5173'),
      navigationLinkBtn?.click(),
    ]);
  }

  await page.waitForSelector('.cities__card');
  const firstCard = await page.$('.cities__card');
  await firstCard?.click();
  await page.waitForSelector('.offer__gallery');

  const commentForm = await page.$('.reviews__form');
  expect(commentForm).not.toBeTruthy();
});
