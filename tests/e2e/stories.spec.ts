import { test, expect, data } from "./fixtures/mockApi";

test.describe("stories (blogs)", () => {
  test("list page renders all articles with thumbnails", async ({ page }) => {
    await page.goto("/stories");
    for (const a of data.articles.items) {
      await expect(page.getByText(a.title).first()).toBeVisible();
    }
    // Cards carry images (explicit thumbnail / first body image / fallback).
    expect(await page.locator("img").count()).toBeGreaterThanOrEqual(
      data.articles.items.length,
    );
  });

  test("clicking a story opens its detail page", async ({ page }) => {
    await page.goto("/stories");
    await page.getByText(data.articles.items[0].title).first().click();
    await expect(page).toHaveURL(
      new RegExp(`/stories/${data.articles.items[0].slug}`),
    );
    await expect(
      page.getByRole("heading", { name: data.singleArticle.title }),
    ).toBeVisible();
  });

  test("detail page renders article body content", async ({ page }) => {
    await page.goto(`/stories/${data.singleArticle.slug}`);
    await expect(page.getByText(/free dental camp/i).first()).toBeVisible();
  });

  test("thumbnail marker comment is not rendered as visible text", async ({
    page,
  }) => {
    await page.goto("/stories");
    // The <!-- thumbnail: ... --> comment must never leak into the preview.
    await expect(page.getByText(/thumbnail:/i)).toHaveCount(0);
  });
});
