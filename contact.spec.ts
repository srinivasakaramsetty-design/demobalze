
import { log } from '../utils/logger';
import { expect, test } from './fixtures';

test('should send a contact message while logged in', async ({ loggedInPage }) => {

    log('Contact message test started');

    await loggedInPage.locator("//a[text()='Contact']").click();
    log('Contact menu clicked');

    await expect(loggedInPage.locator('#exampleModal')).toBeVisible();
    log('Contact modal displayed successfully');

    await loggedInPage.locator('#recipient-email').fill('playwright-test@example.com');
    log('Recipient email entered');

    await loggedInPage.locator('#recipient-name').fill('Playwright Test');
    log('Recipient name entered');

    await loggedInPage.locator('#message-text').fill('Automated contact form test.');
    log('Contact message entered');

    const alertMessage = loggedInPage.waitForEvent('dialog').then(async (dialog) => {
        const message = dialog.message();

        log('Alert message received: ' + message);

        await dialog.accept();
        log('Alert accepted');

        return message;
    });

    await loggedInPage.locator("//button[text()='Send message']").click();
    log('Send message button clicked');

    expect(await alertMessage).toBe('Thanks for the message!!');

    log('Contact message verification passed');
});
