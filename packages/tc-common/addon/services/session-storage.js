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
            this.intl.t('errors.ssGetItemFail', {
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
        JSON.stringify(ENV.APP.DEFAULTS.sessionStorage),
      );
    }
  }

  set(item, value) {
    const settings = JSON.parse(sessionStorage.getItem(ENV.APP.SESSION_STORAGE_KEY));

    // if sessionStorage[key] exists, move on
    if (settings) {
      // if sessionStorage[key][item] exists, move on
      if (settings[item] !== undefined) {
        settings[item] = value;
        sessionStorage.setItem(ENV.APP.SESSION_STORAGE_KEY, JSON.stringify(settings));
      }
      // otherwise, check if item has default value
      else {
        // if so, set item to default value
        if (Object.hasOwn(ENV.APP.DEFAULTS.sessionStorage, item)) {
          settings[item] = ENV.APP.DEFAULTS.sessionStorage[item];
          sessionStorage.setItem(ENV.APP.SESSION_STORAGE_KEY, JSON.stringify(settings));
        }
        // otherwise, throw error
        else {
          console.error(
            this.intl.t('errors.ssSetItemFail', {
              keyName: ENV.APP.SESSION_STORAGE_KEY,
              itemName: item,
              value: value,
            }),
          );
        }

        return null;
      }
    }
    // otherwise, create default key
    else {
      const obj = {};
      obj[item] = value;
      return sessionStorage.setItem(ENV.APP.SESSION_STORAGE_KEY, JSON.stringify(obj));
    }
  }
}
