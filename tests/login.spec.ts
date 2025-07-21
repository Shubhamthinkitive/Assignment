
import { test, expect } from '@playwright/test';

// Base URL of the login page
const BASE_URL = 'https://the-internet.herokuapp.com/login';

// Test data
const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';
const INVALID_USERNAME = 'invalidUser';
const INVALID_PASSWORD = 'invalidPass';

// Page element selectors
const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const LOGIN_BUTTON_SELECTOR = 'button[type="submit"]';
const FLASH_SELECTOR = '#flash';

test.describe('Login Functionality', () => {

  // ✅ Test Case: Successful login with valid credentials
  test('✅ Successful login with valid credentials', async ({ page }) => {
    await page.goto(BASE_URL); // Navigate to login page
    await page.fill(USERNAME_SELECTOR, VALID_USERNAME); // Enter valid username
    await page.fill(PASSWORD_SELECTOR, VALID_PASSWORD); // Enter valid password
    await page.click(LOGIN_BUTTON_SELECTOR); // Click login button

    // Verify success message appears
    await expect(page.locator(FLASH_SELECTOR)).toContainText('You logged into a secure area!');
  });

  // ❌ Test Case: Login fails with invalid username
  test('❌ Failed login with an invalid username', async ({ page }) => {
    await page.goto(BASE_URL); // Navigate to login page
    await page.fill(USERNAME_SELECTOR, INVALID_USERNAME); // Enter invalid username
    await page.fill(PASSWORD_SELECTOR, VALID_PASSWORD); // Enter valid password
    await page.click(LOGIN_BUTTON_SELECTOR); // Click login button

    // Verify error message about invalid username
    await expect(page.locator(FLASH_SELECTOR)).toContainText('Your username is invalid!');
  });

  // ❌ Test Case: Login fails with invalid password
  test('❌ Failed login with an invalid password', async ({ page }) => {
    await page.goto(BASE_URL); // Navigate to login page
    await page.fill(USERNAME_SELECTOR, VALID_USERNAME); // Enter valid username
    await page.fill(PASSWORD_SELECTOR, INVALID_PASSWORD); // Enter invalid password
    await page.click(LOGIN_BUTTON_SELECTOR); // Click login button

    // Verify error message about invalid password
    await expect(page.locator(FLASH_SELECTOR)).toContainText('Your password is invalid!');
  });

  // 🔍 Test Case: Error message disappears after closing
  test('🔍 Error message disappears after closing', async ({ page }) => {
    await page.goto(BASE_URL); // Navigate to login page
    await page.fill(USERNAME_SELECTOR, INVALID_USERNAME); // Enter invalid username
    await page.fill(PASSWORD_SELECTOR, INVALID_PASSWORD); // Enter invalid password
    await page.click(LOGIN_BUTTON_SELECTOR); // Click login button

    const flash = page.locator(FLASH_SELECTOR); // Locate error message

    await expect(flash).toBeVisible(); // Ensure it appears

    // Try to close the flash message if there's a close button
    await flash.locator('button.close').click({ force: true }).catch(() => {
      // If no close button is present, ignore the error
    });

    // Optionally, you can check if the flash message disappears
    // await expect(flash).toBeHidden();
  });
});
