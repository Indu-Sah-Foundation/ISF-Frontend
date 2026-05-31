import { test, expect, data } from "./fixtures/mockApi";

test.describe("admin auth", () => {
  test("visiting an admin page while logged out redirects to login", async ({
    page,
  }) => {
    await page.goto("/admin");
    // Either redirected to /admin/login or a login form is shown.
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("login form renders", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(
      page.locator('input[type="password"], input[name="password"]'),
    ).toBeVisible();
  });

  test("successful login posts credentials and lands in admin", async ({
    page,
  }) => {
    let loginCalled = false;
    await page.route("**/auth/login", async (r) => {
      loginCalled = true;
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(data.loginToken),
      });
    });

    await page.goto("/admin/login");
    await page
      .locator('input[type="email"], input[name="email"]')
      .fill("admin@test.local");
    await page
      .locator('input[type="password"], input[name="password"]')
      .fill("test-password-123!");
    await page.getByRole("button", { name: /log ?in|sign ?in/i }).click();

    await expect.poll(() => loginCalled, { timeout: 5000 }).toBeTruthy();
    // After login we should leave the login page.
    await expect(page).not.toHaveURL(/\/admin\/login/);
  });

  test("failed login shows an error message", async ({ page }) => {
    await page.route("**/auth/login", (r) =>
      r.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "invalid credentials" }),
      }),
    );

    await page.goto("/admin/login");
    await page
      .locator('input[type="email"], input[name="email"]')
      .fill("admin@test.local");
    await page
      .locator('input[type="password"], input[name="password"]')
      .fill("wrong-password");
    await page.getByRole("button", { name: /log ?in|sign ?in/i }).click();

    await expect(
      page.getByText(/invalid|incorrect|failed|wrong/i).first(),
    ).toBeVisible();
    // Still on the login page.
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
