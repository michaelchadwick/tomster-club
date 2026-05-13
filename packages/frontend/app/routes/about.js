import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { hash } from 'rsvp';
import ENV from 'frontend/config/environment';

export default class AboutRoute extends Route {
  @service store;
  @tracked isLoading = true;

  async model() {
    const url = `${ENV.APP.GITHUB_API_URL}/repos/${ENV.APP.GITHUB_USERNAME}/${ENV.APP.GITHUB_SRC_NAME}/commits?sort=updated&per_page=5`;

    const response = await fetch(url);

    if (response.ok) {
      return hash({
        checklists: this.store.findAll('checklist'),
        commits: await response.json(),
      });
    } else {
      return null;
    }
  }
}
