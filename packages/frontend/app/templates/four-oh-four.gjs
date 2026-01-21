import pageTitle from 'ember-page-title/helpers/page-title';
import t from 'ember-intl/helpers/t';
import NotFound from 'tc-common/components/not-found';

<template>
  {{pageTitle (t "general.notFound")}}
  <h2>{{t "general.notFound"}}</h2>
  <div class="full-screen-error main-section">
    <NotFound />
  </div>
</template>
