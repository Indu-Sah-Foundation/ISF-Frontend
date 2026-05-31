import { test, expect, data } from "./fixtures/mockApi";

test.describe("projects (events) page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/events");
  });

  test("renders the page header", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /work|projects/i }).first(),
    ).toBeVisible();
  });

  test("shows current projects", async ({ page }) => {
    const current = data.projects.items.filter((p) => p.kind === "current");
    for (const p of current) {
      await expect(page.getByText(p.title).first()).toBeVisible();
      if (p.lede) {
        await expect(page.getByText(p.lede).first()).toBeVisible();
      }
    }
  });

  test("shows upcoming projects section", async ({ page }) => {
    await expect(page.getByText(/upcoming/i).first()).toBeVisible();
    const upcoming = data.projects.items.filter((p) => p.kind === "upcoming");
    for (const p of upcoming) {
      await expect(page.getByText(p.title).first()).toBeVisible();
    }
  });
});
