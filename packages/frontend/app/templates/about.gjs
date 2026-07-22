import t from 'ember-intl/helpers/t';
import { pageTitle } from 'ember-page-title';
import Loading from 'frontend/components/gh-commits/loading';
import GhCommits from 'frontend/components/gh-commits/index';
<template>
  {{pageTitle (t "layout.navAbout")}}
  <h2>{{t "layout.headAbout"}}</h2>
  {{t "sections.about.description" htmlSafe=true}}

  {{#if @controller.isLoading}}
    <Loading />
  {{else}}
    <div class="checklists">
      {{#each @model.checklists as |checklist|}}
        <h3>{{checklist.title}}</h3>

        <details>
          <summary>{{if checklist.summary checklist.summary "Details"}}</summary>
          {{#each checklist.lists as |list|}}
            <ul class="checklist">
              <li>
                <span class={{if list.checked "checked"}}>
                  {{list.title}}
                </span>
                <ul class="{{if list.code 'code'}}">
                  {{#each list.items as |item|}}
                    <li>{{item}}</li>
                  {{/each}}
                </ul>
              </li>
            </ul>
          {{/each}}
        </details>
      {{/each}}
    </div>
    <GhCommits @title="Last 5 Commits" @commits={{@model.commits}} />
  {{/if}}
</template>
