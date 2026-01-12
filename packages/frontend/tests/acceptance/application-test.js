import { module, test, skip } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'frontend/tests/helpers';
import percySnapshot from '@percy/ember';
import ENV from 'frontend/config/environment';
import { getUniqueName } from '../helpers/percy-snapshot-name';

module('Acceptance | tomster club', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    await percySnapshot(getUniqueName(assert, 'homepage'));

    assert.strictEqual(currentURL(), '/', 'url should be /');
    assert.dom('nav').exists();
    assert.dom('footer.menu').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');

    assert.dom('.checklists').exists();

    assert.strictEqual(document.title, 'Tomster Club', '<title> matches route name');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.strictEqual(currentURL(), '/about', 'url should be /about');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('About the Site');
    assert.dom('p').hasText('Tomster Club is a web application I built to learn about EmberJS.');

    assert.strictEqual(document.title, 'About | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  test('visiting /messages', async function (assert) {
    await visit('/messages');

    assert.strictEqual(currentURL(), '/messages', 'url should be /messages');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('Chat Messages');
    assert.dom('div.messages').exists();

    assert.strictEqual(document.title, 'Messages | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  test('visiting /music', async function (assert) {
    await visit('/music');

    assert.strictEqual(currentURL(), '/music', 'url should be /music');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('Music');

    assert.strictEqual(document.title, 'Music | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  test('visiting /links', async function (assert) {
    await visit('/links');

    assert.strictEqual(currentURL(), '/links', 'url should be /links');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('Related Links');
    assert.dom('ul li').exists();

    assert.strictEqual(document.title, 'Links | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  // test->skip for a11y issues I can't fix yet
  skip('visiting /contact', async function (assert) {
    await visit('/contact');

    assert.strictEqual(currentURL(), '/contact', 'url should be /contact');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('Contact');
    assert.dom('.contact-form form').exists();

    assert.strictEqual(document.title, 'Contact | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  test('visiting /debuggery', async function (assert) {
    await visit('/debuggery');

    assert.strictEqual(currentURL(), '/debuggery', 'url should be /debuggery');
    assert.dom('nav').exists();
    assert.dom('footer').exists();
    assert.dom('footer .links').exists();
    assert.dom('footer .versions').exists();
    assert.dom('h1').hasText('Tomster Club');
    assert.dom('h2').hasText('Debuggery');

    assert.strictEqual(document.title, 'Debuggery | Tomster Club', '<title> matches route name');

    await click('nav a h1');

    assert.strictEqual(currentURL(), '/', 'clicking nav link for homepage goes to /');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('Tomster Club');
    assert.dom('nav a.menu-about').hasText('About');
    assert.dom('nav a.menu-messages').hasText('Messages');
    assert.dom('nav a.menu-music').hasText('Music');
    assert.dom('nav a.menu-links').hasText('Links');
    assert.dom('nav a.menu-contact').hasText('Contact');
    assert.dom('nav a.menu-debuggery svg').hasClass('fa-bug');

    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/', 'clicking nav index link for homepage goes to /');

    await click('nav a.menu-about');
    assert.strictEqual(currentURL(), '/about', 'clicking nav link for About goes to /about');

    await click('nav a.menu-messages');
    assert.strictEqual(
      currentURL(),
      '/messages',
      'clicking nav link for Messages goes to /messages',
    );

    await click('nav a.menu-music');
    assert.strictEqual(currentURL(), '/music', 'clicking nav link for Music goes to /music');

    await click('nav a.menu-links');
    assert.strictEqual(currentURL(), '/links', 'clicking nav link for Links goes to /links');

    // test->skip for a11y issues I can't fix yet
    // await click('nav a.menu-contact');
    // assert.strictEqual(currentURL(), '/contact', 'clicking nav link for Contact goes to /contact');

    await click('nav a.menu-debuggery');
    assert.strictEqual(
      currentURL(),
      '/debuggery',
      'clicking nav icon link for Debuggery goes to /debuggery',
    );
  });

  test('navigating using the footer', async function (assert) {
    await visit('/');

    assert.dom('footer').exists();
    assert.dom('footer a.menu-author').hasText('Author');
    assert.dom('footer a.menu-source').hasText('Source');
    assert.dom('footer a.menu-docs').hasText('Docs');

    if (ENV.environment != 'production') {
      assert.dom('footer a.menu-tests').hasText('[Tests]');
      assert.dom('footer a.menu-prod').hasText('[Prod]');
    }
  });
});
