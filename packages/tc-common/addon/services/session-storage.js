import Service, { service } from '@ember/service';
import ENV from 'frontend/config/environment';

export default class SessionStorageService extends Service {
  @service intl;

  get(item = null) {
    const settings = JSON.parse(sessionStorage.getItem(ENV.APP.SESSION_STORAGE_KEY));

    if (settings) {
      if (item) {
        const keyVal = settings[item];

        if (keyVal !== undefined) {
          return settings[item];
        } else {
          console.error(
            this.intl.t('errors.lsGetItemFail', {
              keyName: ENV.APP.SESSION_STORAGE_KEY,
              itemName: item,
            }),
          );

          return null;
        }
      } else {
        return settings;
      }
    } else {
      return sessionStorage.setItem(
        ENV.APP.SESSION_STORAGE_KEY,
        JSON.stringify({
          sessionStats: 0,
        }),
      );
    }
  }

  set(item, value) {
    const settings = JSON.parse(sessionStorage.getItem(ENV.APP.SESSION_STORAGE_KEY));

    if (settings) {
      if (settings[item] !== undefined) {
        settings[item] = value;
        sessionStorage.setItem(ENV.APP.SESSION_STORAGE_KEY, JSON.stringify(settings));
      } else {
        console.error(
          this.intl.t('errors.lsSetItemFail', {
            keyName: ENV.APP.SESSION_STORAGE_KEY,
            itemName: item,
            value: value,
          }),
        );

        return null;
      }
    } else {
      const obj = {};
      obj[item] = value;
      return sessionStorage.setItem(ENV.APP.SESSION_STORAGE_KEY, JSON.stringify(obj));
    }
  }
}
