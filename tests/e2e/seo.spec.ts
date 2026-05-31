import { test, expect } from "./fixtures/mockApi";

test.describe("SEO + document head", () => {
  test("home has title + meta description + og tags", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/indu sah foundation/i);
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /indu sah foundation/i,
    );
  });

  test("per-page titles differ from the home title", async ({ page }) => {
    await page.goto("/gallery");
    await expect(page).toHaveTitle(/gallery/i);
    await page.goto("/achievements");
    await expect(page).toHaveTitle(/achievement/i);
  });

  test("favicons + apple-touch-icon are declared", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="icon"]').first()).toHaveCount(1);
    await expect(
      page.locator('link[rel="apple-touch-icon"]'),
    ).toHaveCount(1);
  });
});
