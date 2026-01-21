import Component from '@glimmer/component';
import t from 'ember-intl/helpers/t';

export default class extends Component {
  ants = 10;

  get antCount() {
    return this.ants;
  }
  <template>
    <span class="aardvark" data-test-aardvark>
      [{{t "general.antCount"}}:
      <span class="ant-count">{{this.antCount}}</span>]
    </span>
  </template>
}
