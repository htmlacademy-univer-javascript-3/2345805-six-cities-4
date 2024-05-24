import { test, expect } from '@playwright/test';

test.describe('Comment Form', () => {
  test('Проверка работы формы комментария (авторизованный пользователь)', async ({
    page,
  }) => {
    const REVIEW_TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const RATING = 'good';

    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'newUser@example.com');
    await page.fill('input[name="password"]', 'password123');

    await page.click('button[type="submit"]');

    await page.waitForSelector('.cities__card');

    await page.locator('.cities__card').first().click();

    await page.waitForSelector('.offer__gallery');
    const isFormExist = await page.isVisible('.reviews__form');
    expect(isFormExist).toBeTruthy();

    const commentForm = await page.locator('.reviews__form');
    expect(commentForm).toBeTruthy();
    await page.fill('[name="review"]', REVIEW_TEXT);
    await page.getByTitle(RATING).click();

    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/comments') && resp.status() === 201
      ),
      page.click('button[type="submit"]'),
    ]);

    const newReviewText = await page
      .locator('.reviews__text')
      .first()
      .textContent();
    const newReviewAuthor = await page
      .locator('.reviews__user-name')
      .first()
      .textContent();
    const newReviewRating = await page
      .locator('.reviews__stars>span')
      .first()
      .getAttribute('style');

    expect(newReviewText).toBe(REVIEW_TEXT);
    expect(newReviewAuthor).toBe('newUser');
    expect(newReviewRating).toBe('width: 80%;');
  });

  test('Проверка работы формы комментария (неавторизованный пользователь)', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card');

    await page.locator('.cities__card').first().click();
    await page.waitForSelector('.offer__gallery');

    const isCommentFormExist = await page.locator('.reviews__form').isVisible();
    expect(isCommentFormExist).toBeFalsy();
  });
});
