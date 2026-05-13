import t from 'ember-intl/helpers/t';
import { pageTitle } from 'ember-page-title';
import UserProfile from 'frontend/components/user-profile';
import Breadcrumbs from 'frontend/components/breadcrumbs';
<template>
  {{pageTitle @model.fullNameFromDisplayName " | " (t "general.users")}}

  <h2>
    {{t "general.users"}}
  </h2>
  <Breadcrumbs @routes={{@controller.breadcrumbs}} @rootTitle={{@model.id}} />
  <UserProfile @user={{@model}} />
</template>
