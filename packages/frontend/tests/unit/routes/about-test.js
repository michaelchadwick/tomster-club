// tests/unit/routes/about-test.js
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Route: about', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.fetchStub = sinon.stub(window, 'fetch');
  });

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:about');
    assert.ok(route);
  });

  test('returns commit array when fetch succeeds', async function (assert) {
    const fakeCommits = [
      { id: 'abc', message: 'first commit' },
      { id: 'def', message: 'second commit' },
    ];

    const okResponse = {
      ok: true,
      json: sinon.stub().resolves(fakeCommits), // async JSON parser
    };

    this.fetchStub.resolves(okResponse);

    const route = this.owner.lookup('route:about');
    const result = await route.model();

    assert.deepEqual(result, fakeCommits, 'returns the commit array when the HTTP call succeeds');
  });

  test('returns null when fetch fails', async function (assert) {
    const badResponse = { ok: false }; // anything but `ok: true` works

    this.fetchStub.resolves(badResponse);

    const route = this.owner.lookup('route:about');
    const result = await route.model();

    assert.strictEqual(result, null, 'returns null when the HTTP call fails');
  });

  hooks.afterEach(function () {
    this.fetchStub.restore();
  });
});
