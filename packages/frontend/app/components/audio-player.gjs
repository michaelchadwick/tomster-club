import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'frontend/config/environment';
import t from 'ember-intl/helpers/t';
import { on } from '@ember/modifier';
import FaIcon from 'frontend/components/fa-icon';
import split from 'frontend/helpers/split';
import playWhen from 'frontend/modifiers/play-when';

export default class AudioPlayerComponent extends Component {
  @tracked isPlaying = false;
  @tracked rangeVolume = 30;

  maxVolume = 100;
  decreaseVolume = null;

  get pathIndexLength() {
    return ENV.environment == 'production' ? 5 : 3;
  }

  @action
  setVolume(event) {
    this.rangeVolume = parseInt(event.target.value, 10);
  }

  @action
  play() {
    this.isPlaying = true;
  }

  @action
  pause() {
    this.isPlaying = false;
  }

  get audioVolume() {
    return (this.rangeVolume / 100).toFixed(2);
  }
  <template>
    <div class="audio-player{{if @compact ' compact'}}{{if this.isPlaying ' is-playing'}}">
      {{#if @showTitle}}
        <h3>{{t "components.audioPlayer.head"}}</h3>
      {{/if}}

      <audio
        loop={{@shouldLoop}}
        {{playWhen this.isPlaying}}
        volume={{this.audioVolume}}
        data-test-audio-player
      >
        <source src={{@srcURL}} />
        <track kind="captions" />
        {{t "errors.notSupported" description="<audio>"}}
      </audio>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={{this.rangeVolume}}
        id="audio-volume"
        oninput={{this.setVolume}}
      />
      <label class="sr-only" for="audio-volume">{{t "general.volume"}}</label>
      {{!-- <div class="volume-tooltip">{{this.rangeVolume}}</div> --}}

      <div class="audio-title">{{split @srcURL delimiter="/" index=this.pathIndexLength}}</div>

      {{#unless this.isPlaying}}
        <button
          type="button"
          id="btn-audio-play"
          aria-label={{t "components.audioPlayer.play"}}
          title={{t "components.audioPlayer.play"}}
          {{on "click" this.play}}
        >
          <FaIcon @icon="play" />
        </button>
      {{/unless}}
      {{#if this.isPlaying}}
        <button
          type="button"
          id="btn-audio-pause"
          aria-label={{t "components.audioPlayer.pause"}}
          title={{t "components.audioPlayer.pause"}}
          {{on "click" this.pause}}
        >
          <FaIcon @icon="pause" />
        </button>
      {{/if}}
    </div>
  </template>
}
