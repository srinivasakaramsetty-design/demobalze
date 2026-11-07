import { readLoginConfig } from '../utils/configReader';
import { log } from '../utils/logger';
import { expect, test } from './fixtures';

test('should login successfully', async ({ loggedInPage }) => {

    log('Login test execution started');

    const { username } = await readLoginConfig();
    log('Expected username retrieved');

    const displayedUser = await loggedInPage.locator('#nameofuser').textContent();

    log('Displayed username: ' + displayedUser);

    expect(displayedUser).toContain(username);

    log('Username verification passed');
});