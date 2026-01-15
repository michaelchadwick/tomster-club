import { create } from 'ember-cli-page-object';

const definition = {
  scope: '[data-test-not-found]',
  backToHomeLink: {
    scope: '[data-test-back-to-home]',
  },
};

export default definition;
export const component = create(definition);
