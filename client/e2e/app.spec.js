import { test, expect } from '@playwright/test'

test.describe('ShopSmart E2E Tests', () => {
  test('page loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    expect(response.status()).toBe(200)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('heading TRIUMPH is visible', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('header')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('TRIUMPH')
  })

  test('banner and button are visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=THE BONNIE TO YOUR CLYDE')).toBeVisible()
    await expect(page.locator('text=SHOP CLASSICS')).toBeVisible()
  })

  test('products are loaded', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Wireless Headphones Pro').first()).toBeVisible()
  })

  test('cart section opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.locator('button', { hasText: '🛒' }).first().click({ force: true })
    await expect(page.getByText('Shopping Cart')).toBeVisible()
    await page.locator('.close-button').evaluate((b) => b.click())
    await expect(page.locator('.cart-sidebar')).not.toHaveClass(/active/)
  })

  test('no console errors on load', async ({ page }) => {
    const errors = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/')
    await page.waitForTimeout(2000)

    expect(errors).toHaveLength(0)
  })

  test('page is responsive at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})
