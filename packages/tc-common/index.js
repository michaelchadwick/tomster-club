'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: require('./package').name,
  _env: null,

  options: {
    babel: {
      plugins: [
        require.resolve('ember-auto-import/babel-plugin'),
        require.resolve('ember-concurrency/async-arrow-task-transform'),
      ],
    },
  },

  included: function () {
    this._super.included.apply(this, arguments);

    // _findHost is private API but it's been stable in ember-cli for two years.
    this._env = this._findHost().env;
  },

  treeForApp(appTree) {
    const trees = [appTree];
    if (['test', 'development'].includes(this._env)) {
      const mirageDir = path.join(__dirname, 'addon-mirage-support');
      const mirageTree = new Funnel(mirageDir, { destDir: 'tests/test-support/mirage' });
      trees.push(mirageTree);
    }
    return MergeTrees(trees);
  },

  treeForAddonTestSupport(tree) {
    // intentionally not calling _super here
    // so that we can have our `import`'s be
    // import { ... } from 'tc-common';

    return this.preprocessJs(tree, '/', this.name, {
      registry: this.registry,
    });
  },

  treeForPublic(publicTree) {
    const trees = [];
    if (publicTree) {
      trees.push(publicTree);
    }

    return MergeTrees(trees);
  },
};
