import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import getElement from 'tc-common/modifiers/get-element';

module('Integration | Modifier | get-element', function (hooks) {
  setupRenderingTest(hooks);

  test('it passes element to a valid callback', async function (assert) {
    this.rootElement = null;
    this.setRootElement = (element) => {
      this.rootElement = element;
    };
    assert.strictEqual(this.rootElement, null);
    await render(
      <template>
        <div id="root-element" {{getElement this.setRootElement}}></div>
      </template>,
    );
    assert.strictEqual(this.rootElement, document.getElementById('root-element'));
  });

  skip('it fails when no callback is given', async function (assert) {
    assert.expect(1);

    this.set('invalidCallback', 'not-a-function');

    // const renderWithoutCallback = async () => {
    //   await render(hbs`<div {{get-element}}></div>`);
    // };
    // assert.throws(
    //   renderWithoutCallback,
    //   /get-element modifier expects a callback as the first positional argument, but got: string/,
    //   'Throws an error when invalid callback is provided',
    // );

    //   // Temporarily handle global errors for this test
    //   let originalOnError = window.onerror;
    //   let capturedError = null;

    //   window.onerror = (msg, url, line, col, error) => {
    //     console.log('window.onerror', error);
    //     capturedError = error.message;
    //     return false; // Prevent the error from failing the test suite globally.
    //   };

    //   try {
    //     await render(hbs`<div id='root-element' {{get-element this.invalidCallback}}></div>`);
    //   } finally {
    //     window.onerror = originalOnError;
    //   }

    //   assert.strictEqual(
    //     capturedError,
    //     'get-element modifier expects a callback as the first positional argument, but got: string',
    //     'Throws an error with the correct message when a non-function is passed',
    //   );
  });
});
