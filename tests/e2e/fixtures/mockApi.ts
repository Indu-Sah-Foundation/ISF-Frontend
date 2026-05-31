import { test as base, expect, type Page } from "@playwright/test";
import * as data from "./data";


export async function installApiMocks(page: Page) {
  const json = (body: unknown, status = 200) => ({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });

  const api =
    (body: unknown, status = 200) =>
    (route: import("@playwright/test").Route) => {
      const type = route.request().resourceType();
      if (type !== "fetch" && type !== "xhr") return route.fallback();
      return route.fulfill(json(body, status));
    };

  // Public reads
  await page.route("**/articles?*", api(data.articles));
  await page.route("**/articles/*", api(data.singleArticle));
  await page.route("**/projects*", api(data.projects));
  await page.route("**/gallery/tags*", api(data.galleryTags));
  await page.route("**/gallery*", api(data.gallery));
  await page.route("**/achievements*", api(data.achievements));
  await page.route("**/volunteers*", api(data.volunteers));
  await page.route("**/team*", api(data.team));
  await page.route("**/donations/amounts*", api(data.donationAmounts));

  // Writes
  await page.route("**/donations/checkout", api(data.checkoutSession));
  await page.route("**/contacts", api({ ok: true }, 201));
  await page.route("**/auth/login", api(data.loginToken));

  await page.route("https://example.com/**", (r) =>
    r.fulfill({ status: 200, contentType: "image/svg+xml", body: TRANSPARENT_SVG }),
  );
}

const TRANSPARENT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';

export const test = base.extend<{ mockApi: void }>({
  mockApi: [
    async ({ page }, use) => {
      await installApiMocks(page);
      await use();
    },
    { auto: true },
  ],
});

export { expect, data };
