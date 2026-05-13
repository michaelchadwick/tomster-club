import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class UserController extends Controller {
  @service intl;

  get breadcrumbs() {
    return [
      {
        path: 'users',
        title: this.intl.t('general.users'),
      },
    ];
  }
}
