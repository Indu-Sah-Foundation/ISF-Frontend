import { test, expect, data } from "./fixtures/mockApi";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero renders headline + location chip + hero image", async ({ page }) => {
    await expect(page.getByText(/loharpatti, nepal/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toContainText(/better/i);
    const hero = page.locator('img[alt="Children in a Nepali classroom"]');
    await expect(hero).toBeVisible();
  });

  test("impact stats are present", async ({ page }) => {
    await expect(page.getByText("7,000+")).toBeVisible();
    await expect(page.getByText(/districts across nepal/i)).toBeVisible();
  });

  test("letter from the founders is shown", async ({ page }) => {
    await expect(page.getByText(/letter from the founders/i)).toBeVisible();
    await expect(page.getByText(/Lal Sah/i)).toBeVisible();
    await expect(page.getByText(/Shubham Sah/i)).toBeVisible();
  });

  test("programs section lists current projects from API", async ({ page }) => {
    const current = data.projects.items.filter((p) => p.kind === "current");
    for (const p of current.slice(0, 3)) {
      await expect(page.getByText(p.title, { exact: false }).first()).toBeVisible();
    }
  });

  test("blogs section renders story cards with images", async ({ page }) => {
    const section = page.locator("section", { hasText: "Blogs" });
    await expect(section.getByRole("heading", { name: "Blogs" })).toBeVisible();
    // Each of the 3 fixture articles renders a card with an image.
    for (const a of data.articles.items) {
      await expect(section.getByText(a.title).first()).toBeVisible();
    }
    // Every story card must have an <img> (poster, inline, or fallback).
    const imgs = section.locator("img");
    expect(await imgs.count()).toBeGreaterThanOrEqual(data.articles.items.length);
  });

  test("blog card with no body image still shows a fallback image", async ({
    page,
  }) => {
    // a2 (ISF Robotics) has no thumbnail + no inline image → fallback asset.
    const section = page.locator("section", { hasText: "Blogs" });
    const card = section
      .getByRole("link")
      .filter({ hasText: "ISF Robotics Program Launch" });
    await expect(card.locator("img")).toBeVisible();
  });

  test("story card links to detail page", async ({ page }) => {
    const section = page.locator("section", { hasText: "Blogs" });
    await section.getByText(data.articles.items[0].title).first().click();
    await expect(page).toHaveURL(/\/stories\//);
  });

  test("CTA donate button navigates to donate", async ({ page }) => {
    await page.getByRole("link", { name: /donate now/i }).click();
    await expect(page).toHaveURL(/\/donate/);
  });
});
