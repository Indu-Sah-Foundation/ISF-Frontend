import { test, expect } from "./fixtures/mockApi";

test.describe("navbar behavior", () => {
  test("home navbar is transparent/glassy (white text)", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
    // Home uses .navbar-transparent and white text.
    await expect(nav).toHaveClass(/navbar-transparent/);
    await expect(nav).toHaveClass(/text-white/);
  });

  test("inner page navbar is solid white with dark text", async ({ page }) => {
    await page.goto("/about");
    const nav = page.locator("nav").first();
    await expect(nav).toHaveClass(/bg-white/);
    await expect(nav).toHaveClass(/text-zinc-900/);
  });

  test("inner page content is not covered by the navbar at the top", async ({
    page,
  }) => {
    await page.goto("/about");
    const nav = page.locator("nav").first();
    const navBox = await nav.boundingBox();
    const heading = page.getByRole("heading", { name: /who we are/i });
    const headingBox = await heading.boundingBox();
    expect(navBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    // The heading's top must sit below the navbar's bottom (with the gap).
    expect(headingBox!.y).toBeGreaterThanOrEqual(navBox!.y + navBox!.height - 2);
  });

  test("home navbar hides on scroll down, reappears on scroll up", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();

    // Scroll down well past the threshold. Use window.scrollTo (works on every
    // engine incl. mobile WebKit, which doesn't support mouse.wheel).
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(nav).toHaveClass(/-translate-y-full/);

    // Scroll back to the very top.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav).toHaveClass(/translate-y-0/);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens and closes the menu on an inner page", async ({
    page,
  }) => {
    await page.goto("/about");
    const toggle = page.getByRole("button", { name: /open menu/i });
    await expect(toggle).toBeVisible();
    await toggle.click();

    // Menu links visible.
    const menuLink = page.getByRole("link", { name: "Gallery" });
    await expect(menuLink).toBeVisible();

    // Navigates from the menu.
    await menuLink.click();
    await expect(page).toHaveURL(/\/gallery$/);
  });

  test("hamburger menu is not clipped on inner pages (overflow fix)", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /open menu/i }).click();
    // The previously-clipped dropdown must actually be visible.
    await expect(page.getByRole("link", { name: "Volunteers" })).toBeVisible();
  });
});
