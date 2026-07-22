import t from 'ember-intl/helpers/t';

<template>
  <div id="index-grid">
    <a href="/about">
      <div id="about">
        <h2>{{t "sections.index.about.title"}}</h2>
        {{t "sections.index.about.description"}}
      </div>
    </a>
    <a href="/messages">
      <div id="messages">
        <h2>{{t "sections.index.messages.title"}}</h2>
        {{t "sections.index.messages.description"}}
      </div>
    </a>
    <a href="/music">
      <div id="music">
        <h2>{{t "sections.index.music.title"}}</h2>
        {{t "sections.index.music.description"}}
      </div>
    </a>
    <a href="/links">
      <div id="links">
        <h2>{{t "sections.index.links.title"}}</h2>
        {{t "sections.index.links.description"}}
      </div>
    </a>
    <a href="/contact">
      <div id="contact">
        <h2>{{t "sections.index.contact.title"}}</h2>
        {{t "sections.index.contact.description"}}
      </div>
    </a>
    <a href="/debuggery">
      <div id="debuggery">
        <h2>{{t "sections.index.debuggery.title"}}</h2>
        {{t "sections.index.debuggery.description"}}
      </div>
    </a>

  </div>
</template>
