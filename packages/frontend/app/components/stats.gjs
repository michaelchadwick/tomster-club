import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';
import t from 'ember-intl/helpers/t';

export default class StatsComponent extends Component {
  @service('local-storage') ls;
  @service('session-storage') ss;

  @tracked localCount = 0;
  @tracked sessionCount = 0;

  constructor() {
    super(...arguments);
    this.localCount = this.ls.get('localStats') ?? 0;
    this.sessionCount = this.ss.get('sessionStats') ?? 0;
  }

  @action
  increaseLocal() {
    this.localCount += 1;
    this.ls.set('localStats', this.localCount);
  }

  @action
  increaseSession() {
    this.sessionCount += 1;
    this.ss.set('sessionStats', this.sessionCount);
  }
  <template>
    <div class="stats">
      {{#if @showTitle}}
        <h3>{{t "components.stats.head"}}</h3>
      {{/if}}

      <div>
        <label>{{t "components.stats.local"}}: </label>
        <span>{{this.localCount}}
          <button type="button" onclick={{this.increaseLocal}}>+</button></span>
      </div>

      <div>
        <label>{{t "components.stats.session"}}: </label>
        <span>{{this.sessionCount}}
          <button type="button" onclick={{this.increaseSession}}>+</button></span>
      </div>
    </div>
  </template>
}
