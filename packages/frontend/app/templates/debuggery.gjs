import t from 'ember-intl/helpers/t';
import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import BoxGallery from 'frontend/components/box-gallery';
import Chart from 'frontend/components/chart';
import Concurrency from 'frontend/components/concurrency';
import DetailsGallery from 'frontend/components/details-gallery';
import FaIconStack from 'frontend/components/fa-icon-stack';
import PasswordValidator from 'frontend/components/password-validator';
import RandomText from 'frontend/components/random-text';
import Stats from 'frontend/components/stats';
<template>
  {{pageTitle (t "layout.headDebuggery")}}
  <h2>{{t "layout.headDebuggery"}}</h2>

  <ul>
    <li>
      <LinkTo @route="upload">{{t "layout.headFileUpload"}}</LinkTo>
    </li>
    <li>
      <FaIconStack @icons={{@model.stackedIcon}} @title="Unpublished" />
    </li>
  </ul>

  <div class="component-display">
    <h3>{{t "components.stats.head"}}</h3>
    <Stats />
  </div>

  <div class="component-display">
    <h3>{{t "components.emberSimpleCharts.head"}}</h3>
    <Chart @name="donut" @isIcon={{false}} id="donut1" />
    <Chart @name="donut" @isIcon={{true}} id="donut2" />
  </div>

  <div class="component-display">
    <Concurrency />
  </div>

  <div class="component-display">
    <DetailsGallery
      @title="Various Test Components"
      @ghUserData={{@model.ghUser}}
      @detailsGalleryExpanded={{@model.detailsGalleryExpanded}}
      @onDetailsGalleryToggle={{@controller.detailsGalleryToggle}}
    />
  </div>

  {{#if @model.dave}}
    <div class="component-display">
      <h3>{{t "components.debuggery.daveApi.head"}}</h3>
      <ul>
        {{#each-in @model.dave.config as |key val|}}
          <li>{{key}}: {{val}}</li>
        {{/each-in}}
      </ul>
    </div>
  {{/if}}

  <div class="component-display">
    <PasswordValidator />
  </div>

  <div class="component-display">
    <BoxGallery />
  </div>

  <div class="component-display">
    <RandomText @paragraphs="5" @sentences="5" />
  </div>
</template>
