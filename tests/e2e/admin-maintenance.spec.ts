import { test, expect } from "./fixtures/mockApi";

// Seed an admin session in localStorage before the app boots, so protected
// /admin routes render instead of bouncing to /admin/login.
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

const recentIssues = {
  items: [
    {
      number: 12,
      html_url:
        "https://github.com/Indu-Sah-Foundation/ISF-Frontend/issues/12",
      title: "Footer link is broken on the website",
      state: "open",
    },
    {
      number: 9,
      html_url: "https://github.com/Indu-Sah-Foundation/ISF-Backend/issues/9",
      title: "Redis cache timeout in the API",
      state: "closed",
    },
  ],
};

test.describe("admin maintenance", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.route("**/admin/maintenance", async (route) => {
      // Only intercept the API call (fetch/xhr). The SPA page route shares this
      // exact path, so a document navigation must fall through to the real app.
      const type = route.request().resourceType();
      if (type !== "fetch" && type !== "xhr") return route.fallback();
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(recentIssues),
        });
      } else {
        await route.fallback();
      }
    });
  });

  test("page renders the form and recent issues", async ({ page }) => {
    await page.goto("/admin/maintenance");
    await expect(
      page.getByRole("heading", { name: /maintenance/i }).first(),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/donate button is cut off/i)).toBeVisible();
    // Recent issues from the mocked list show up.
    await expect(
      page.getByText("Footer link is broken on the website"),
    ).toBeVisible();
    await expect(page.getByText("Redis cache timeout in the API")).toBeVisible();
  });

  test("submitting a request POSTs and shows the routed result", async ({
    page,
  }) => {
    let postedTitle = "";
    await page.route("**/admin/maintenance", async (route) => {
      const req = route.request();
      // Don't hijack the document navigation to the SPA page route.
      const type = req.resourceType();
      if (type !== "fetch" && type !== "xhr") return route.fallback();
      if (req.method() === "POST") {
        postedTitle = (req.postDataJSON() as { title: string }).title;
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            area: "frontend",
            repo: "ISF-Frontend",
            issue: {
              number: 42,
              html_url:
                "https://github.com/Indu-Sah-Foundation/ISF-Frontend/issues/42",
              title: postedTitle,
              state: "open",
            },
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(recentIssues),
        });
      }
    });

    await page.goto("/admin/maintenance");
    await page
      .getByPlaceholder(/donate button is cut off/i)
      .fill("The hero image loads slowly on the homepage");
    await page.getByRole("button", { name: /submit request/i }).click();

    // Confirmation banner with the routed repo + issue link.
    await expect(page.getByText(/filed to/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /issue #42/i })).toBeVisible();
    expect(postedTitle).toContain("hero image");
  });

  test("submit button is disabled until the title is long enough", async ({
    page,
  }) => {
    await page.goto("/admin/maintenance");
    const submit = page.getByRole("button", { name: /submit request/i });
    const title = page.getByPlaceholder(/donate button is cut off/i);

    await expect(submit).toBeDisabled();
    await title.fill("ab"); // too short (<3 chars)
    await expect(submit).toBeDisabled();
    await title.fill("A real maintenance request");
    await expect(submit).toBeEnabled();
  });

  test("maintenance is reachable from the admin nav", async ({ page }) => {
    await page.goto("/admin");
    await page.getByRole("link", { name: /maintenance/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/maintenance/);
  });
});
