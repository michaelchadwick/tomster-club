import t from 'ember-intl/helpers/t';
import { pageTitle } from 'ember-page-title';
import ErrorDisplay from 'frontend/components/error-display';
import Footer from 'frontend/components/layout/footer';
import NavBar from 'frontend/components/layout/nav-bar';
import Ribbon from 'frontend/components/layout/ribbon';
import TomsterPopper from 'frontend/components/tomster-popper';

<template>
  {{pageTitle (t "general.siteTitle") separator=" | " front=false}}
  <div class="application-wrapper" id="base-wrapper">
    <TomsterPopper />

    <Ribbon @position="right" @content={{@controller.appEnv}} />

    <header>
      <NavBar />
    </header>

    <main id="main">
      {{#if @controller.showErrorDisplay}}
        <ErrorDisplay @errors={{@controller.errors}} @clearErrors={{@controller.clearErrors}} />
      {{else}}
        {{outlet}}
      {{/if}}
    </main>
  </div>

  <Footer
    @audioPath={{@controller.audioPath}}
    @audioShouldLoop={{@controller.audioShouldLoop}}
    @rsVersionTag={{@controller.rsVersionTag}}
    @apiVersionTag={{@controller.apiVersionTag}}
    @frontendVersionTag={{@controller.frontendVersionTag}}
  />
</template>
