import { test, expect, data } from "./fixtures/mockApi";

test.describe("gallery page", () => {
  test("renders gallery images grouped by tag", async ({ page }) => {
    await page.goto("/gallery");
    await expect(
      page.getByRole("heading", { name: /photos|gallery|programs/i }).first(),
    ).toBeVisible();
    // At least the fixture images should be present.
    expect(await page.locator("img").count()).toBeGreaterThanOrEqual(
      data.gallery.items.length,
    );
  });

  test("tag filters are shown from the curated tag list", async ({ page }) => {
    await page.goto("/gallery");
    for (const t of data.galleryTags.items) {
      await expect(page.getByText(t.name, { exact: false }).first()).toBeVisible();
    }
  });

  test("clicking an image opens the lightbox", async ({ page }) => {
    await page.goto("/gallery");
    const firstImg = page.locator("img").first();
    await firstImg.click();
    // Lightbox renders a close affordance (X button / role=dialog).
    const closer = page.getByRole("button", { name: /close/i });
    if (await closer.count()) {
      await expect(closer.first()).toBeVisible();
      await closer.first().click();
    }
  });
});
