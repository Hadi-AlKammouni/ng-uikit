import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Ng-UIKit docs app. The docs site exercises every
 * component, so we drive the library through real DOM interactions on its
 * docs pages rather than mounting components in isolation.
 */

test.describe('Button', () => {
  test('loading buttons expose aria-busy and aria-disabled', async ({ page }) => {
    await page.goto('/button');
    const loading = page.getByTestId('button-loading');
    await expect(loading).toBeVisible();
    await expect(loading).toHaveAttribute('aria-busy', 'true');
    await expect(loading).toHaveAttribute('aria-disabled', 'true');
  });

  test('disabled buttons block clicks', async ({ page }) => {
    await page.goto('/button');
    const disabled = page.getByRole('button', { name: 'Disabled' }).first();
    await expect(disabled).toBeDisabled();
  });
});

test.describe('Modal', () => {
  test('opens, traps focus, ESC closes and restores focus', async ({ page }) => {
    await page.goto('/modal');
    const trigger = page.getByTestId('open-modal');
    await trigger.focus();
    await trigger.press('Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    // Focus should be inside the dialog now.
    const focusInsideDialog = await dialog.evaluate((el) => el.contains(document.activeElement));
    expect(focusInsideDialog).toBe(true);

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    // Focus should have returned to the trigger.
    await expect(trigger).toBeFocused();
  });
});

test.describe('Toast', () => {
  test('clicking Success pushes a toast and it auto-dismisses', async ({ page }) => {
    await page.goto('/toast');
    await page.getByTestId('toast-success').click();
    const toast = page.locator('[data-uikit-toast]').first();
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Settings saved.');
    // Default duration is 4 s — give it 6 s of leeway.
    await expect(toast).toHaveCount(0, { timeout: 6_000 });
  });
});

test.describe('Table', () => {
  test('clicking a sortable header toggles ascending/descending', async ({ page }) => {
    await page.goto('/table');
    const customerHeader = page.getByRole('button', { name: 'Sort by Customer' });

    // First click → ascending.
    await customerHeader.click();
    await expect(customerHeader.locator('xpath=ancestor::th[1]')).toHaveAttribute(
      'aria-sort',
      'ascending',
    );

    // First row should be the alphabetically-first customer ("Acme Cooperative").
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toContainText('Acme Cooperative');

    // Second click → descending.
    await customerHeader.click();
    await expect(customerHeader.locator('xpath=ancestor::th[1]')).toHaveAttribute(
      'aria-sort',
      'descending',
    );
    await expect(page.locator('tbody tr').first()).toContainText('Quartz Energy');
  });
});

test.describe('Tabs', () => {
  test('right-arrow moves focus to the next enabled tab and skips disabled', async ({ page }) => {
    await page.goto('/tabs');
    const tabs = page.locator('[data-testid="tabs"] [role="tab"]');
    const first = tabs.nth(0);
    await first.focus();
    await first.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    // Tab 3 is disabled — pressing ArrowRight again should wrap to tab 1.
    await tabs.nth(1).press('ArrowRight');
    await expect(tabs.nth(0)).toBeFocused();
  });
});
