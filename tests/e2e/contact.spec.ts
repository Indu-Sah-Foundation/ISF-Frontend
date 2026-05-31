import { test, expect } from "./fixtures/mockApi";

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders the form", async ({ page }) => {
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("submitting valid data posts to /contacts and shows success", async ({
    page,
  }) => {
    // Track the POST via a request listener (doesn't consume the route, so the
    // auto-mock's fulfill still returns 201 and the UI shows success).
    let posted = false;
    page.on("request", (req) => {
      if (req.method() === "POST" && req.url().includes("/contacts")) {
        posted = true;
      }
    });

    // The form has email + message (both HTML5 `required`).
    await page
      .locator('input[type="email"], input[name="email"]')
      .first()
      .fill("donor@example.com");
    await page.locator("textarea").first().fill("Hello from a Playwright test.");

    await page.getByRole("button", { name: /send|submit/i }).first().click();

    // Success path: the form swaps to the "received your note" confirmation.
    await expect(page.getByText(/received your note/i)).toBeVisible();
    expect(posted).toBeTruthy();
  });

  test("invalid email is rejected (HTML5 or app validation)", async ({
    page,
  }) => {
    const email = page
      .locator('input[type="email"], input[name="email"]')
      .first();
    // Wait for the field to render (count() doesn't auto-wait → flaky skip).
    await expect(email).toBeVisible();
    await email.fill("not-an-email");
    const message = page.locator("textarea").first();
    if (await message.count()) await message.fill("hi");
    await page.getByRole("button", { name: /send|submit/i }).first().click();
    // Either native validity fails or we stay on the page without success.
    const valid = await email.evaluate(
      (el: HTMLInputElement) => el.checkValidity?.() ?? true,
    );
    expect(valid).toBeFalsy();
  });
});
