import t from 'ember-intl/helpers/t';
<template>
  <p>{{t "general.indexHead"}}</p>

  <div class="checklists">
    {{#each @model.checklists as |checklist|}}
      <h2>{{checklist.title}}</h2>

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
</template>
