import { module, skip } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { component } from 'tc-common/page-objects/components/not-found';
import NotFound from 'tc-common/components/not-found';

module('Integration | Component | not-found', function (hooks) {
  setupRenderingTest(hooks);

  skip('it displays not found message', async function (assert) {
    await render(<template><NotFound /></template>);
    assert.strictEqual(
      component.text,
      'Alack! The resource could not be found. Please check your page address, and try again.',
    );
    assert.ok(component.backToHomeLink.isPresent);
    assert.strictEqual(component.backToHomeLink.text, 'Back to Home');
  });
});
