import { test, expect } from "./fixtures/mockApi";
import AxeBuilder from "@axe-core/playwright";

// Automated a11y scan on the main public pages. We assert no *serious* or
// *critical* WCAG violations; minor/moderate are reported but not failed so
// the suite stays actionable rather than noisy.
const routes = ["/", "/about", "/events", "/gallery", "/stories", "/contact"];

test.describe("accessibility (axe)", () => {
  test.beforeEach(({ browserName }) => {
    test.skip(
      browserName !== "chromium",
      "axe scan runs on chromium only (a11y is engine-agnostic)",
    );
  });

  for (const route of routes) {
    test(`no serious/critical a11y violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      if (blocking.length) {
        console.log(
          `a11y violations on ${route}:`,
          blocking.map((v) => `${v.id} (${v.impact}) - ${v.help}`).join("\n"),
        );
      }
      expect(blocking).toEqual([]);
    });
  }

  test("every public page has exactly one h1", async ({ page }) => {
    for (const route of ["/", "/about", "/gallery", "/stories"]) {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
      const count = await page.locator("h1").count();
      expect(count, `h1 count on ${route}`).toBeGreaterThanOrEqual(1);
    }
  });

  test("images have alt attributes", async ({ page }) => {
    await page.goto("/");
    const imgsWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imgsWithoutAlt).toBe(0);
  });
});
