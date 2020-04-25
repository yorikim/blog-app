const { reloadApp } = require('detox-expo-helpers');

describe('Home', () => {
  beforeAll(async () => {
    await reloadApp();
  });

  const email = `${Math.random().toString(36).substring(7)}@ex.com`
  const password = "somepassword";

  it('allows to sign up', async () => {
    await element(by.id('authTab')).tap();

    await element(by.id("email")).typeText(email);
    await element(by.id("password")).typeText(password);

    await element(by.id("signUp")).tap();
  });

  it('allows to sign out', async () => {
    await waitFor(element(by.id("signOut"))).toBeVisible().withTimeout(2000);
    await element(by.id("signOut")).tap();
  });

  it('allows to sign in', async () => {
    await element(by.id("email")).typeText(email);
    await element(by.id("password")).typeText(password);

    await element(by.id("signIn")).tap();
  });
});
