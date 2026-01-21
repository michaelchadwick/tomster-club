import Component from '@glimmer/component';
import { service } from '@ember/service';
import { cached } from '@glimmer/tracking';
import { LinkTo } from '@ember/routing';
import { get } from '@ember/helper';
import t from 'ember-intl/helpers/t';
import { TrackedAsyncData } from 'ember-async-data';
import FaIcon from 'frontend/components/fa-icon';

export default class UserMenuComponent extends Component {
  @service intl;
  @service session;
  @service currentUser;

  userModel = new TrackedAsyncData(this.currentUser.getModel());

  @cached
  get model() {
    return this.userModel.isResolved ? this.userModel.value : null;
  }

  <template>
    <nav class="user-menu" aria-label={{t "layout.navUserMenu"}} data-test-user-menu>
      {{#if this.session.isAuthenticated}}
        <div class="authenticated-session-data" data-test-user-authenticated>
          <FaIcon @icon="user" @title={{get this.model "fullName"}} />
          <span class="username">{{get this.model "fullName"}}</span>
        </div>
        <LinkTo @route="logout">
          ({{t "general.logout"}})
        </LinkTo>
      {{else}}
        <div data-test-user-anonymous>
          <FaIcon @icon="user-secret" @title={{t "general.anonymousUser"}} />
          <span class="username">{{t "general.anonymousUser"}}</span>
        </div>
      {{/if}}
    </nav>
  </template>
}
