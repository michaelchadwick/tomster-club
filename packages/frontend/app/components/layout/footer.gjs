import Component from '@glimmer/component';
import ENV from 'frontend/config/environment';
import { service } from '@ember/service';
import t from 'ember-intl/helpers/t';
import { LinkTo } from '@ember/routing';
import AudioPlayer from 'frontend/components/audio-player';
import FaIcon from 'frontend/components/fa-icon';
import Aardvark from 'frontend/components/aardvark';
import UserMenu from 'frontend/components/user-menu';

export default class FooterComponent extends Component {
  @service intl;

  defaultLink = {
    iconType: 'fas',
    target: '_blank',
  };

  get links() {
    const links = [];

    links.push({
      ...this.defaultLink,
      url: ENV.APP.AUTHOR_URL,
      icon: 'at',
      title: this.intl.t('layout.footAuthor'),
      class: this.intl.t('layout.footAuthor').toLowerCase(),
    });

    links.push({
      ...this.defaultLink,
      url: ENV.APP.GITHUB_SRC_URL,
      icon: 'github',
      iconType: 'fab',
      title: this.intl.t('layout.footSource'),
      class: this.intl.t('layout.footSource').toLowerCase(),
    });

    links.push({
      ...this.defaultLink,
      url: 'https://guides.emberjs.com/release/components/',
      icon: 'book',
      title: this.intl.t('layout.footDocs'),
      class: this.intl.t('layout.footDocs').toLowerCase(),
    });

    if (ENV.environment != 'production') {
      links.push({
        ...this.defaultLink,
        query: 'nocontainer',
        route: 'tests',
        icon: 'flask',
        title: `[${this.intl.t('layout.footTests')}]`,
        class: this.intl.t('layout.footTests').toLowerCase(),
      });

      links.push({
        ...this.defaultLink,
        url: ENV.APP.NETLIFY_URL,
        icon: 'square-up-right',
        title: `[${this.intl.t('layout.footProd')}]`,
        class: this.intl.t('layout.footProd').toLowerCase(),
      });
    }

    return links;
  }
  <template>
    <footer class="menu" aria-label={{t "layout.footMenu"}}>
      <div class="links">
        <AudioPlayer
          @srcURL={{@audioPath}}
          @shouldLoop={{@audioShouldLoop}}
          @showTitle={{false}}
          @compact={{true}}
        />
        {{#each this.links as |link|}}
          {{#if link.route}}
            <LinkTo @route={{link.route}} class="menu-{{link.class}}" target={{link.target}}>
              <FaIcon @icon={{link.icon}} @prefix={{link.iconType}} />{{link.title}}
            </LinkTo>
          {{else}}
            <a href={{link.url}} class="menu-{{link.class}}" target={{link.target}}>
              <FaIcon @icon={{link.icon}} @prefix={{link.iconType}} />{{link.title}}
            </a>
          {{/if}}
        {{/each}}
      </div>
      <div class="versions">
        {{@rsVersionTag}}
        {{@apiVersionTag}}
        {{@frontendVersionTag}}
        [{{t "general.antCount"}}:
        <Aardvark />]
        <UserMenu />
      </div>
    </footer>
  </template>
}
