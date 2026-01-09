import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { findById, uniqueValues } from 'tc-common/utils/array-helpers';
import { task, timeout } from 'ember-concurrency';
import onClickOutside from 'ember-click-outside/modifiers/on-click-outside';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import { concat, fn } from '@ember/helper';
import eq from 'ember-truth-helpers/helpers/eq';
import focus from 'tc-common/modifiers/focus';
import FaIcon from 'frontend/components/fa-icon';

export default class LocaleChooserComponent extends Component {
  @service intl;
  @tracked isOpen = false;
  @service('local-storage') ls;

  get locale() {
    const locale = this.intl.get('primaryLocale');
    return findById(this.locales, locale);
  }

  get locales() {
    return uniqueValues(this.intl.get('locales')).map((locale) => {
      return { id: locale, text: this.intl.t('general.language.' + locale) };
    });
  }

  get uniqueId() {
    return guidFor(this);
  }

  @action
  changeLocale(id, event) {
    this.isOpen = false;
    this.intl.setLocale(id);
    this.ls.set('locale', id);
    window.document.querySelector('html').setAttribute('lang', id);
    window.document
      .querySelector('meta[name="description"]')
      .setAttribute('content', this.intl.t('general.metaDescription'));
    event.target.parentElement.parentElement.firstElementChild.focus();
  }

  focusFirstLink = task(async () => {
    document.body.classList.add('no-scroll');
    await timeout(1);
    document.querySelector('.locale-chooser .menu button:first-of-type').focus();
  });

  handleArrowUp(item) {
    if (item?.previousElementSibling) {
      item.previousElementSibling.focus();
    } else {
      item?.parentElement.lastElementChild.focus();
    }
  }

  async handleArrowDown(item) {
    if (item.classList.value == 'toggle') {
      this.isOpen = true;
      await this.focusFirstLink.perform();
    } else {
      if (item.nextElementSibling) {
        item.nextElementSibling.focus();
      } else {
        await this.focusFirstLink.perform();
      }
    }
  }

  @action
  async toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      await this.focusFirstLink.perform();
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  @action
  keyUp(event) {
    const { key, target } = event;
    event.preventDefault();
    switch (key) {
      case 'ArrowDown':
        this.handleArrowDown(target);
        break;
      case 'ArrowUp':
        this.handleArrowUp(target);
        break;
      case 'Escape':
      case 'Tab':
      case 'ArrowRight':
      case 'ArrowLeft':
        this.close();
        break;
    }
  }
  @action
  clearFocus(event) {
    const buttons = event.target.parentElement.children;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].blur();
    }
  }
  @action
  close() {
    this.isOpen = false;
    document.body.classList.remove('no-scroll');
  }
  <template>
    <div class="locale-chooser" data-test-locale-chooser {{onClickOutside this.close}}>
      <button
        type="button"
        class="toggle"
        aria-haspopup="true"
        aria-expanded={{if this.isOpen "true" "false"}}
        aria-labelledby="{{this.uniqueId}}-locale-chooser-title"
        data-level="toggle"
        data-test-toggle
        {{on "keyup" this.keyUp}}
        {{on "click" this.toggleMenu}}
      >
        <FaIcon @icon="globe" />
        <span id="{{this.uniqueId}}-locale-chooser-title">
          {{t (concat "general.language." this.locale.id)}}
        </span>
        <FaIcon @icon={{if this.isOpen "caret-down" "caret-right"}} />
      </button>
      {{#if this.isOpen}}
        <div class="menu" role="menu">
          {{#each this.locales as |loc index|}}
            <button
              type="button"
              role="menuitemradio"
              lang={{loc.id}}
              tabindex="-1"
              aria-checked={{if (eq this.locale.id loc.id) "true" "false"}}
              data-level="item"
              data-test-item
              {{on "click" (fn this.changeLocale loc.id)}}
              {{on "keyup" this.keyUp}}
              {{on "mouseenter" this.clearFocus}}
              {{focus (eq index 0)}}
            >
              {{loc.text}}
            </button>
          {{/each}}
        </div>
      {{/if}}
    </div>
  </template>
}
