import { test, expect } from "./fixtures/mockApi";

// These override the default mocks AFTER they're installed (later route
// handlers win) to assert graceful degradation.

test.describe("graceful error + empty states", () => {
  test("home shows a friendly message when stories API errors", async ({
    page,
  }) => {
    await page.route("**/articles?*", (r) =>
      r.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
    );
    await page.goto("/");
    const section = page.locator("section", { hasText: "Blogs" });
    await expect(
      section.getByText(/temporarily unavailable|check back/i),
    ).toBeVisible();
    // The page itself must NOT crash.
    await expect(page.getByText("This page didn't load")).toHaveCount(0);
  });

  test("home shows empty-state copy when no stories exist", async ({ page }) => {
    await page.route("**/articles?*", (r) =>
      r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], total: 0 }),
      }),
    );
    await page.goto("/");
    await expect(page.getByText(/no stories published/i)).toBeVisible();
  });

  test("projects section degrades gracefully on API error", async ({ page }) => {
    await page.route("**/projects*", (r) =>
      r.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
    );
    await page.goto("/");
    await expect(
      page.getByText(/programs are temporarily unavailable/i),
    ).toBeVisible();
  });

  test("gallery empty state renders", async ({ page }) => {
    await page.route("**/gallery*", (r) =>
      r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], total: 0 }),
      }),
    );
    await page.goto("/gallery");
    await expect(page.getByText("This page didn't load")).toHaveCount(0);
  });
});
