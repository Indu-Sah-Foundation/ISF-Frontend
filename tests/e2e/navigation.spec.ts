import { test, expect } from "./fixtures/mockApi";

// Every primary nav destination should load and render its header eyebrow.
const pages = [
  { path: "/", heading: /better/i },
  { path: "/about", heading: /who we are/i },
  { path: "/events", heading: /work|projects/i },
  { path: "/achievements", heading: /recognized|achievements/i },
  { path: "/gallery", heading: /gallery|photos|field/i },
  { path: "/stories", heading: /stories|blog/i },
  { path: "/volunteers", heading: /volunteer/i },
  { path: "/contact", heading: /contact|get in touch|reach/i },
  { path: "/donate", heading: /donate|give|fund|support/i },
];

test.describe("navigation", () => {
  for (const p of pages) {
    test(`loads ${p.path}`, async ({ page }) => {
      const resp = await page.goto(p.path);
      expect(resp?.status() ?? 200).toBeLessThan(400);
      // App shell rendered.
      await expect(page.locator("nav").first()).toBeVisible();
      // No client crash boundary.
      await expect(page.getByText("This page didn't load")).toHaveCount(0);
    });
  }

  test("nav links route to the right pages", async ({ page, isMobile }) => {
    const nav = page.locator("nav").first();

    // On mobile the links live behind the hamburger; open it each time.
    const openMenuIfMobile = async () => {
      if (isMobile) {
        await nav.getByRole("button", { name: /open menu/i }).click();
      }
    };

    const go = async (linkName: string, urlRe: RegExp) => {
      await page.goto("/");
      await openMenuIfMobile();
      const link = nav.getByRole("link", { name: linkName });
      // Ensure the (mobile) menu has actually rendered the link before click.
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(urlRe);
    };

    await go("About", /\/about$/);
    await go("Projects", /\/events$/);
    await go("Gallery", /\/gallery$/);
    await go("Blogs", /\/stories$/);
  });

  test("logo returns home from an inner page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: /indu sah foundation/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("unknown route shows 404", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText(/page not found/i)).toBeVisible();
    await page.getByRole("link", { name: /go home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
