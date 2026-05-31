import { test, expect, data } from "./fixtures/mockApi";

test.describe("about page", () => {
  test("renders eyebrow + heading", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText(/about us/i).first()).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /who we are/i }),
    ).toBeVisible();
  });

  test("header aligns to the same max-width container as body", async ({
    page,
  }) => {
    await page.goto("/about");
    // Regression guard for the max-w-5xl → max-w-7xl alignment fix.
    const header = page.locator("header").first();
    const headerBox = await header.boundingBox();
    const main = page.locator("main, .max-w-7xl").first();
    const mainBox = await main.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(mainBox).not.toBeNull();
    // Left edges should line up within a small tolerance.
    expect(Math.abs((headerBox!.x ?? 0) - (mainBox!.x ?? 0))).toBeLessThan(40);
  });
});

test.describe("achievements page", () => {
  test("renders achievements from API", async ({ page }) => {
    await page.goto("/achievements");
    await expect(
      page.getByRole("heading", { name: /recognized|achievements/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByText(data.achievements.items[0].title).first(),
    ).toBeVisible();
  });
});

test.describe("volunteers page", () => {
  test("renders volunteer entries", async ({ page }) => {
    await page.goto("/volunteers");
    await expect(
      page.getByRole("heading", { name: /volunteer/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByText(data.volunteers.items[0].name).first(),
    ).toBeVisible();
  });
});
