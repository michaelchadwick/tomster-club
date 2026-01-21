import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';
import { TrackedAsyncData } from 'ember-async-data';
import { appVersion } from 'frontend/helpers/app-version';
import ENV from 'frontend/config/environment';

export default class ApplicationController extends Controller {
  @service apiVersion;
  @service intl;
  @service rsConfig;
  // @service session;
  // @service currentUser;

  @tracked currentlyLoading = false;
  @tracked errors = [];
  @tracked showErrorDisplay = false;

  appVersion = new TrackedAsyncData(this.rsConfig.getAppVersion());

  get audioPath() {
    return ENV.environment == 'production'
      ? ENV.APP.AUDIO_PLAYER_FILE_REMOTE
      : ENV.APP.AUDIO_PLAYER_FILE_LOCAL;
  }

  get audioShouldLoop() {
    return true;
  }

  @cached
  get tcVersionTag() {
    if (this.appVersion.isResolved) {
      return `[App: ${this.appVersion.value}]`;
    }

    return '';
  }

  get apiVersionTag() {
    if (this.apiVersion.version) {
      return `[API: ${this.apiVersion.version}]`;
    }

    return '';
  }

  get frontendVersionTag() {
    const version = appVersion(null, { versionOnly: true });
    if (version) {
      return `[Frontend: v${version}]`;
    }

    return '';
  }

  @action
  clearErrors() {
    this.errors = [];
    this.showErrorDisplay = false;
  }

  @action
  addError(error) {
    this.errors = [...this.errors, error];
    this.showErrorDisplay = true;
  }
}
