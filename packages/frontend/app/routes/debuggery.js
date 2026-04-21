import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
// import { typeOf } from '@ember/utils';
import { hash } from 'rsvp';
import ENV from 'frontend/config/environment';

export default class DebuggeryRoute extends Route {
  @service store;
  @service daveApi;
  @service('local-storage') ls;

  beforeModel() {
    // const num = 1;
    // const foo = 'foo';
    // const bar = [];
    // const baz = {};
    // console.log('num', typeOf(num));
    // console.log('foo', typeOf(foo));
    // console.log('bar', typeOf(bar));
    // console.log('baz', typeOf(baz));
  }

  async model() {
    let daveData;

    try {
      daveData = await this.daveApi.fetchData('?config');
    } catch (e) {
      console.error('DaveAPI error', e);
      daveData.body = 'No data received from Dave.';
    }

    if (this.ls.get('detailsGalleryExpanded')) {
      this.detailsGalleryExpanded = this.ls.get('detailsGalleryExpanded');
    }

    return hash({
      dave: daveData.body,
      detailsGalleryExpanded: this.detailsGalleryExpanded,
      ghUser: this.store.findRecord('gh-user', ENV.APP.GITHUB_USERNAME),
      stackedIcon: ['circle-check', 'slash'],
    });
  }

  @action
  loading(transition) {
    let start = new Date();
    transition.promise.finally(() => {
      console.info(`Took ${new Date() - start}ms to load`);
    });

    return true;
  }

  async afterModel() {
    await import('zxcvbn');
  }
}
