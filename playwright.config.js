// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
 
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 4 : undefined,
 
  reporter: 'html',

  use: {
  
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',

  },

});

