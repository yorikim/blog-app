const { reloadApp } = require('detox-expo-helpers');

describe('Home', () => {
  beforeAll(async () => {
    await reloadApp({
      permissions: {
        camera: 'YES',
        photos: 'YES'
      }
    });
  });

  it('displays the post list', async () => {
    await expect(element(by.id("postList"))).toBeVisible();
  });

  it('requires a signed user to create a post', async () => {
    await element(by.id("addPostButton")).tap();
    await expect(element(by.id("signUp"))).toBeVisible();
  });

  it('requires authentication', async () => {
    const email = `${Math.random().toString(36).substring(7)}@ex.com`
    const password = "somepassword";

    await element(by.id("email")).typeText(email);
    await element(by.id("password")).typeText(password);

    await element(by.id("signUp")).tap();
  });

  let postId = Math.random().toString(36).substring(7);
  it('allows to create a new post', async () => {
    await element(by.id('homeTab')).tap();

    await element(by.id("addPostButton")).tap();

    await element(by.id("title")).typeText(`${postId}`);
    await element(by.id("body")).typeText("body");

    await element(by.id("pickImage")).tap();
    await element(by.traits(['button']).and(by.type('_UIAlertControllerActionView'))).atIndex(1).tap();
    await element(by.text('Allow')).tap();

    await element(by.id('saveButton')).tap();
    await expect(element(by.id("postList"))).toBeVisible();

    await expect(element(by.id(postId))).toBeVisible();
  });

  postId = Math.random().toString(36).substring(7);
  it('allows to edit the post', async () => {
    await element(by.id(`edit-${postId}`)).tap();

    await element(by.id("title")).clearText();
    await element(by.id("title")).typeText(postId);
    await element(by.id("body")).typeText(`${postId} updated `);
    await element(by.id('saveButton')).tap();

    await expect(element(by.id("postList"))).toBeVisible();
    await expect(element(by.id(`body-${postId}`))).toBeVisible();
  });

  it('allows to remove the post', async () => {
    await element(by.id(`remove-${postId}`)).tap();
    await element(by.text('OK')).tap();

    await expect(element(by.id("postList"))).toBeVisible();
    await expect(element(by.id(`${postId} updated body`))).toBeNotVisible();
  });
});
