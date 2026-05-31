import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E config for the ISF frontend.
 *
 * - Boots the Vite dev server automatically (webServer below) so `npx playwright
 *   test` is the only command you need locally and in CI.
 * - VITE_ISF_API is left empty on purpose: with no base URL the app issues
 *   same-origin relative requests (e.g. `/articles`), which our tests intercept
 *   via page.route(). That makes the whole suite deterministic and runnable
 *   WITHOUT a live backend.
 * - Cross-browser + mobile viewports so layout/navbar behavior is covered
 *   everywhere it matters.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],

  // Serve the STATIC build exactly like production does. The app ships as a
  // static SPA on Azure Static Web Apps (dist/client, _shell.html renamed to
  // index.html, SPA fallback to /index.html). `serve -s` replicates that
  // fallback. Using `vite preview` instead runs the SSR server build, which
  // doesn't match prod and is flaky under parallel E2E load.
  // `VITE_ISF_API=""` forces same-origin relative API calls the tests intercept.
  webServer: {
    command: "npm run preview:static",
    url: "http://localhost:4173",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_ISF_API: "",
      VITE_ISF_API_KEY: "test-key",
    },
  },
});
