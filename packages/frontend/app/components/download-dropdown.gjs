import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import t from 'ember-intl/helpers/t';
import FaIcon from 'frontend/components/fa-icon';

export default class DownloadDropdownComponent extends Component {
  @tracked isOpen = false;

  @action
  toggleDropdown(event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  @action
  async getFile(action) {
    const a = document.createElement('a');
    if (URL && 'download' in a) {
      const resp = await fetch(action.link);
      const blob = await resp.blob();
      a.href = URL.createObjectURL(blob);
      a.setAttribute('download', action.filename);
      a.click();
      URL.revokeObjectURL(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(action.link);
    }
  }

  <template>
    {{! template-lint-disable no-invalid-interactive }}
    <div class="btn-group download-dropdown" {{on "click" this.toggleDropdown}}>
      <button type="button" aria-haspopup="true" aria-expanded={{this.isOpen}}>
        <FaIcon @icon="download" />
        {{t "general.download"}}
      </button>

      <ul
        class="dropdown-menu{{if this.isOpen ' show'}}"
        aria-labelledby="dropdownMenuButton"
        role="menu"
      >
        {{#each @actions as |opt|}}
          <li class="dropdown-item" role="none">
            <button
              type="button"
              class="dropdown-item"
              role="menuitem"
              tabindex="-1"
              {{on "click" (fn this.getFile opt)}}
            >
              {{opt.text}}
            </button>
          </li>
        {{/each}}
      </ul>
    </div>
  </template>
}
