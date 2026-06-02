import { test, expect } from "./fixtures/mockApi";

// Seed an admin session so /admin routes render instead of redirecting to login.
async function loginAsAdmin(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "isf_admin_token",
      "header.payload.test-admin-token",
    );
    window.localStorage.setItem(
      "isf_admin_user",
      JSON.stringify({ id: "u1", email: "admin@test.local", role: "admin" }),
    );
  });
}

const messages = {
  items: [
    {
      id: "m1",
      email: "donor@example.com",
      message: "Loved the dental camp coverage!",
      ip: "1.2.3.4",
      read: false,
      created_at: "2026-05-01T10:00:00Z",
    },
  ],
  count: 1,
  limit: 200,
  offset: 0,
};

// Two paid donations + one pending. Net should deduct Stripe's 2.2% + $0.30
// per paid donation. Totals must ignore the pending row.
const donations = {
  items: [
    {
      id: "d1",
      amount_cents: 5000,
      currency: "usd",
      email: "asha@example.com",
      name: "Asha Sharma",
      status: "paid",
      stripe_session_id: "cs_live_1",
      created_at: "2026-05-02T12:00:00Z",
      updated_at: "2026-05-02T12:00:00Z",
    },
    {
      id: "d2",
      amount_cents: 10000,
      currency: "usd",
      email: "ram@example.com",
      name: "Ram Thapa",
      status: "paid",
      stripe_session_id: "cs_live_2",
      created_at: "2026-05-03T12:00:00Z",
      updated_at: "2026-05-03T12:00:00Z",
    },
    {
      id: "d3",
      amount_cents: 2500,
      currency: "usd",
      email: null,
      name: null,
      status: "pending",
      stripe_session_id: "cs_live_3",
      created_at: "2026-05-04T12:00:00Z",
      updated_at: "2026-05-04T12:00:00Z",
    },
  ],
  count: 3,
  limit: 200,
  offset: 0,
};

test.describe("admin activity", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.route("**/contacts?*", (route) => {
      const type = route.request().resourceType();
      if (type !== "fetch" && type !== "xhr") return route.fallback();
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(messages),
      });
    });
    await page.route("**/donations?*", (route) => {
      const type = route.request().resourceType();
      if (type !== "fetch" && type !== "xhr") return route.fallback();
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(donations),
      });
    });
  });

  test("page renders with Messages tab active by default", async ({ page }) => {
    await page.goto("/admin/contacts");
    await expect(
      page.getByRole("heading", { name: /activity/i }).first(),
    ).toBeVisible();
    // Messages content shows by default.
    await expect(page.getByText("Loved the dental camp coverage!")).toBeVisible();
  });

  test("switching to Donations shows totals and the table", async ({ page }) => {
    await page.goto("/admin/contacts");
    await page.getByRole("button", { name: /donations/i }).click();

    // Stat cards.
    await expect(page.getByText("Total raised")).toBeVisible();
    await expect(page.getByText("Net raised")).toBeVisible();

    // Total raised = $150.00 (paid rows only: 5000 + 10000; pending excluded).
    await expect(page.getByText("$150.00")).toBeVisible();

    // Table rows for the two paid donors; the pending one must NOT appear.
    await expect(page.getByText("Asha Sharma")).toBeVisible();
    await expect(page.getByText("Ram Thapa")).toBeVisible();
  });

  test("net raised is less than total (Stripe fees deducted)", async ({
    page,
  }) => {
    await page.goto("/admin/contacts");
    await page.getByRole("button", { name: /donations/i }).click();

    // Net = (5000 - round(5000*.022) - 30) + (10000 - round(10000*.022) - 30)
    //     = (5000-110-30) + (10000-220-30) = 4860 + 9750 = 14610 → $146.10
    await expect(page.getByText("$146.10")).toBeVisible();
    // And it must differ from the gross.
    await expect(page.getByText("$150.00")).toBeVisible();
  });

  test("pending donations are excluded from the table", async ({ page }) => {
    await page.goto("/admin/contacts");
    await page.getByRole("button", { name: /donations/i }).click();
    // The pending row had no name → would render "Anonymous"; ensure only the
    // two paid donors are present by checking the pending session's amount is
    // absent ($25.00).
    await expect(page.getByText("$25.00")).toHaveCount(0);
  });

  test("can switch back to Messages", async ({ page }) => {
    await page.goto("/admin/contacts");
    await page.getByRole("button", { name: /donations/i }).click();
    await page.getByRole("button", { name: /messages/i }).click();
    await expect(page.getByText("Loved the dental camp coverage!")).toBeVisible();
  });
});
