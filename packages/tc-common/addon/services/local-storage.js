import Service, { service } from '@ember/service';
import ENV from 'frontend/config/environment';

export default class LocalStorageService extends Service {
  @service intl;

  get(item = null) {
    const settings = JSON.parse(localStorage.getItem(ENV.APP.LOCAL_STORAGE_KEY));

    if (settings) {
      if (item) {
        const keyVal = settings[item];

        if (keyVal !== undefined) {
          return settings[item];
        } else {
          console.error(
            this.intl.t('errors.lsGetItemFail', {
              keyName: ENV.APP.LOCAL_STORAGE_KEY,
              itemName: item,
            }),
          );

          return null;
        }
      } else {
        return settings;
      }
    } else {
      return localStorage.setItem(
        ENV.APP.LOCAL_STORAGE_KEY,
        JSON.stringify({
          detailsGalleryExpanded: false,
          localStats: 0,
        }),
      );
    }
  }

  set(item, value) {
    const settings = JSON.parse(localStorage.getItem(ENV.APP.LOCAL_STORAGE_KEY));

    if (settings) {
      if (settings[item] !== undefined) {
        settings[item] = value;
        localStorage.setItem(ENV.APP.LOCAL_STORAGE_KEY, JSON.stringify(settings));
      } else {
        console.error(
          this.intl.t('errors.lsSetItemFail', {
            keyName: ENV.APP.LOCAL_STORAGE_KEY,
            itemName: item,
            value: value,
          }),
        );

        return null;
      }
    } else {
      const obj = {};
      obj[item] = value;
      return localStorage.setItem(ENV.APP.LOCAL_STORAGE_KEY, JSON.stringify(obj));
    }
  }
}
