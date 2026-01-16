import t from 'ember-intl/helpers/t';
import FaIcon from 'frontend/components/fa-icon';
<template>
  <h2>{{t "layout.headMusic"}}</h2>
  <p>{{t "sections.music.description" htmlSafe=true}}</p>

  <div class="loading-spinner">
    <FaIcon @icon="spinner" @spin={{true}} />
    {{t "general.loading"}}
  </div>
</template>
