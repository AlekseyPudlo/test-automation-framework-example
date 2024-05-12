import { defineConfig, devices } from '@playwright/test';
import { URLS, TIME_UNITS } from './utils/constants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'report' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  expect: { timeout: TIME_UNITS.TEN_SECONDS },
  use: {
    baseURL: URLS.BASE_URL,
    viewport: { width: 1900, height: 1200 },
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 300,
    },
    trace: 'on-first-retry',
    headless: true,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'prod',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
