import { test as base, expect, type Page } from '@playwright/test';
import fs from 'fs';
import { readLoginConfig } from '../utils/configReader';
import { log } from '../utils/logger';

type Fixtures = {
    loginPage: Page;
    loggedInPage: Page;
};

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {

        log('Application launch started');

        const { baseUrl } = await readLoginConfig();

        await page.goto(baseUrl);

        log('Application launched successfully');

        await use(page);
    },

    loggedInPage: async ({ loginPage }, use) => {

        const { username, password } = await readLoginConfig();

        log('Login process started');

        await loginPage.locator('#login2').click();
        await loginPage.locator('#loginusername').fill(username);
        await loginPage.locator('#loginpassword').fill(password);

        await loginPage.locator("//button[normalize-space()='Log in']").click();

        await loginPage.waitForSelector('#nameofuser', { state: 'visible' });

        log('Login successful');

        await use(loginPage);
    },
});

// Automatic screenshot on failure
test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {

        fs.mkdirSync('screenshots', { recursive: true });

        await page.screenshot({
            path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`,
            fullPage: true
        });

        log('Test failed: ' + testInfo.title);
        log('Failure screenshot captured');
    }
});

export { expect };
