import { test, expect } from '@playwright/test'

test.describe('ShopSmart E2E Tests', () => {
  // 1. Page loads successfully with 200 status
  test('page loads successfully', async ({ page }) => {
    const response = await page.goto('/')
    expect(response.status()).toBe(200)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  // 2. Page title is correct
  test('page title is ShopSmart', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('ShopSmart')
  })

  // 3. Main heading is visible
  test('heading ShopSmart is visible', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('ShopSmart')
  })

  // 4. Loading state appears initially
  test('loading state appears', async ({ page }) => {
    // Block API requests so loading stays visible
    await page.route('**/api/health', (route) => {
      // Never respond — keeps loading state
      route.abort()
    })
    await page.goto('/')
    await expect(page.getByText('Loading backend status...')).toBeVisible()
  })

  // 5. Card section exists on page
  test('card section exists', async ({ page }) => {
    await page.goto('/')
    const card = page.locator('.card')
    await expect(card).toBeVisible()
  })

  // 6. Hint text is visible
  test('hint text is visible', async ({ page }) => {
    await page.goto('/')
    const hint = page.locator('.hint')
    await expect(hint).toBeVisible()
    await expect(hint).toContainText('Edit')
    await expect(hint).toContainText('src/App.jsx')
  })

  // 7. Backend Status heading exists
  test('backend status heading is visible', async ({ page }) => {
    await page.goto('/')
    const h2 = page.locator('h2')
    await expect(h2).toBeVisible()
    await expect(h2).toHaveText('Backend Status')
  })

  // 8. Page has correct viewport meta tag
  test('page has viewport meta tag', async ({ page }) => {
    await page.goto('/')
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0')
  })

  // 9. No console errors on page load
  test('no console errors on load', async ({ page }) => {
    const errors = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/')
    // Let any async errors settle
    await page.waitForTimeout(2000)

    expect(errors).toHaveLength(0)
  })

  // 10. Page is responsive at mobile viewport
  test('page is responsive at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()

    const card = page.locator('.card')
    await expect(card).toBeVisible()

    const hint = page.locator('.hint')
    await expect(hint).toBeVisible()
  })
})
