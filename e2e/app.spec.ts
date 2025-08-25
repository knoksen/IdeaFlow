import { test, expect } from '@playwright/test';

test.describe('Basic App Flow', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/IdeaFlow/);
  });

  test('can add a new idea', async ({ page }) => {
    await page.goto('/');
    
    // Click the add idea button
    await page.getByRole('button', { name: /add idea/i }).click();
    
    // Wait for the sheet to be visible
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Fill in the idea details
    await page.getByLabel(/title/i).fill('Test Idea');
    await page.getByLabel(/description/i).fill('This is a test idea');
    
    // Submit the form
    await page.getByRole('button', { name: /save/i }).click();
    
    // Verify the idea appears in the list
    await expect(page.getByText('Test Idea')).toBeVisible();
  });

  test('can use AI generator', async ({ page }) => {
    await page.goto('/');
    
    // Open AI generator
    await page.getByRole('button', { name: /generate/i }).click();
    
    // Wait for the dialog
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Enter prompt
    await page.getByLabel(/prompt/i).fill('Generate a business idea');
    
    // Click generate
    await page.getByRole('button', { name: /generate/i }).click();
    
    // Wait for response
    await expect(page.getByText(/loading/i)).not.toBeVisible();
    
    // Verify we got a response
    await expect(dialog.getByText(/idea/i)).toBeVisible();
  });

  test('responsive layout', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 720 });
    const desktopMenu = page.getByRole('navigation');
    await expect(desktopMenu).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Test mobile menu interaction
    await mobileMenuButton.click();
    const mobileMenu = page.getByRole('navigation');
    await expect(mobileMenu).toBeVisible();
  });
});
