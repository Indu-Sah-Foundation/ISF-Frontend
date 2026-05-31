import { test, expect } from "./fixtures/mockApi";

// Verifies the frontend attaches the API key header to backend calls — the
// client-side half of the API-key gateway. We sniff outgoing requests.

test.describe("API request contract", () => {
  test("requests to the backend include the X-API-Key header", async ({
    page,
  }) => {
    const seenKeys: string[] = [];
    await page.route("**/articles?*", async (r) => {
      const h = r.request().headers();
      if (h["x-api-key"]) seenKeys.push(h["x-api-key"]);
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], total: 0 }),
      });
    });

    await page.goto("/");
    await expect.poll(() => seenKeys.length, { timeout: 5000 }).toBeGreaterThan(0);
    // From playwright.config webServer env: VITE_ISF_API_KEY=test-key
    expect(seenKeys[0]).toBe("test-key");
  });

  test("article list request uses pagination params", async ({ page }) => {
    let requestedUrl = "";
    await page.route("**/articles?*", async (r) => {
      requestedUrl = r.request().url();
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], total: 0 }),
      });
    });
    await page.goto("/");
    await expect.poll(() => requestedUrl, { timeout: 5000 }).toContain("limit=");
  });
});
