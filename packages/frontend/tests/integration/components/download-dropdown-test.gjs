import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import DownloadDropdown from 'frontend/components/download-dropdown';

module('Integration | Component | download-dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><DownloadDropdown /></template>);

    assert.dom('.download-dropdown').exists();
  });
});
