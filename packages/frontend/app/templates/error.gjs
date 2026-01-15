import { pageTitle } from 'ember-page-title';
import t from 'ember-intl/helpers/t';
<template>
  {{pageTitle (t "general.error")}}
  <h2>{{t "layout.headError"}}</h2>

  <p>{{t "errors.generic"}}</p>
</template>
