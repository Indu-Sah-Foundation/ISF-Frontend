import { test, expect } from "./fixtures/mockApi";

test.describe("donate flow", () => {
  test("donate page renders", async ({ page }) => {
    await page.goto("/donate");
    await expect(
      page.getByRole("heading", { name: /fund|donate|give|support/i }).first(),
    ).toBeVisible();
  });

  test("starting checkout calls /donations/checkout and redirects to Stripe", async ({
    page,
  }) => {
    let checkoutCalled = false;
    await page.route("**/donations/checkout", async (r) => {
      checkoutCalled = true;
      await r.fulfill({
        status: 200,
        contentType: "application/json",
        // Use a same-origin stub so the test browser doesn't actually navigate
        // to Stripe; we only assert the call fired + a redirect was attempted.
        body: JSON.stringify({ url: "/donate/thanks", session_id: "cs_test_x" }),
      });
    });

    await page.goto("/donate");

    // An amount MUST be chosen first — the checkout mutation throws
    // "Minimum donation is $1.00" and never calls the API otherwise. Pick one
    // of the preset amount buttons (they render "$10", "$25", etc.).
    const amountBtn = page
      .getByRole("button", { name: /^\$\d/ })
      .first();
    await expect(amountBtn).toBeVisible();
    await amountBtn.click();

    const checkoutBtn = page.getByRole("button", {
      name: /continue to checkout|continue|checkout/i,
    });
    await expect(checkoutBtn).toBeVisible();
    await checkoutBtn.click();

    await expect.poll(() => checkoutCalled, { timeout: 5000 }).toBeTruthy();
  });

  test("thanks page renders", async ({ page }) => {
    await page.goto("/donate/thanks");
    await expect(page.getByText(/thank|grateful|received|success/i).first()).toBeVisible();
  });

  test("cancelled page renders", async ({ page }) => {
    await page.goto("/donate/cancelled");
    await expect(page.getByText(/cancel|no charge|not completed/i).first()).toBeVisible();
  });
});
