import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  if (config.environment != 'production') {
    this.route('tests', { path: '/tests?nocontainer' });
  }

  this.route('messages');
  this.route('music');
  this.route('about');
  this.route('links');
  this.route('contact');
  this.route('users', {});
  this.route('user', { path: '/users/:user_id' });
  this.route('debuggery');

  this.route('upload');

  this.route('four-oh-four', { path: '*path' });

  this.route('login');
  this.route('logout');
});
