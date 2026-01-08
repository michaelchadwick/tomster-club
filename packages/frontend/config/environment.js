'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'frontend',
    environment,
    rootURL: '/',
    locationType: 'history',
    flashMessageDefaults: {
      timeout: 3000,
      extendedTimeout: 1000,
      types: ['success', 'warning', 'info', 'alert'],
      injectionFactories: [],
    },
    'ember-simple-auth-token': {
      serverTokenEndpoint: '/auth/login',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: false,
      authorizationPrefix: 'Token ',
    },
    i18n: {
      defaultLocale: 'en',
    },
    serverVariables: {
      tagPrefix: 'rsconfig',
      vars: ['api-host', 'api-name-space', 'error-capture-enabled'],
      defaults: {
        'api-name-space': process.env.RS_FRONTEND_API_NAMESPACE || 'api/v3',
        'api-host': process.env.RS_FRONTEND_API_HOST || null,
        'error-capture-enabled':
          process.env.RS_FRONTEND_ERROR_CAPTURE_ENABLED || environment === 'production',
        'error-capture-environment':
          process.env.RS_FRONTEND_ERROR_CAPTURE_ENVIRONMENT || environment,
      },
    },
    'ember-qunit-nice-errors': {
      completeExistingMessages: true,
      showFileInfo: true,
    },
    'ember-a11y-testing': {
      componentOptions: {
        turnAuditOff: process.env.SKIP_A11Y || false,
        visualNoiseLevel: 1,
      },
    },
    'ember-local-storage': {
      namespace: true,
      keyDelimiter: '/',
      includeEmberDataSupport: false,
    },
    fontawesome: {
      enableExperimentalBuildTimeTransform: false,
      defaultPrefix: 'fas',
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        Array: false,
      },
    },

    APP: {
      AUTHOR_URL: 'https://michaelchadwick.info',
      AUDIO_PLAYER_FILE_LOCAL: '/assets/audio/fezzish.mp3',
      AUDIO_PLAYER_FILE_REMOTE: 'https://neb.host/files/p/fezzish.mp3',
      BOX_GALLERY_DEFAULTS: [
        {
          block: null,
          text: `
            <p>Hello. This is a Box component. This text is coming from the Box component <code>@text</code> argument, and supports HTML.</p>
            <p>It also has a lot of text in it and is probably too tall, so it should be truncated/faded somehow. Here is some more text, and some more text, and some more text, and some more text, and some more text, just in case it needs it to be super duper tall. If that was not enough text, then I will throw in a list.</p>
            <p>Another paragraph to take up height? Don't mind if I put that into the template that gets rendered on the page.</p>
            <p>Another paragraph to take up height? Don't mind if I put that into the template that gets rendered on the page.</p>
            <p>Another paragraph to take up height? Don't mind if I put that into the template that gets rendered on the page.</p>
            <ul>
              <li>One</li>
              <li>Dos</li>
              <li>3</li>
              <li>Quatre</li>
              <li>Funf</li>
              <li>667</li>
              <li>Heaven</li>
              <li>Ate</li>
              <li>Nove</li>
              <li>Binary 3</li>
            </ul>
            <p>Cool list, eh?</p>
          `,
        },
        {
          block: `
            <p>Hey! This is a Box component. This text is coming from a block passed into the Box component. It <b>does not</b> support <code>HTML</code>.</p>
          `,
          text: null,
        },
      ],
      DEFAULTS: {
        localStorage: {
          detailsGalleryExpanded: false,
          locale: 'en-us',
          localStats: 0,
        },
        sessionStorage: {
          sessionStats: 0,
        },
      },
      LOCAL_STORAGE_KEY: 'tomster-club',
      SESSION_STORAGE_KEY: 'tomster-club',
      GITHUB_API_URL: 'https://api.github.com',
      GITHUB_SRC_NAME: 'tomster-club',
      GITHUB_SRC_URL: 'https://github.com/michaelchadwick/tomster-club',
      GITHUB_USERNAME: 'michaelchadwick',
      MUSIC_API_ROOT: 'https://music.nebyoolae.com',
      NETLIFY_URL: 'https://tomster-club.netlify.app',
      isRunningWithServerArgs: process.argv.includes('--server') || process.argv.includes('-s'),
    },
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = !!process.env.LOG_RESOLVER;
    ENV.APP.LOG_ACTIVE_GENERATION = !!process.env.LOG_ACTIVE_GENERATION;
    ENV.APP.LOG_TRANSITIONS = !!process.env.LOG_TRANSITIONS;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = !!process.env.LOG_TRANSITIONS_INTERNAL;
    ENV.APP.LOG_VIEW_LOOKUPS = !!process.env.LOG_VIEW_LOOKUPS;

    //put ember concurrency tasks into debug mode to make errors much easier to spot
    ENV.EmberENV.DEBUG_TASKS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.flashMessageDefaults.timeout = 100;
    ENV.flashMessageDefaults.extendedTimeout = 100;
    ENV.serverVariables.defaults['api-name-space'] = 'api';
    ENV.serverVariables.defaults['api-host'] = '';

    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  // will output in stdout at build
  switch (environment) {
    case 'development': {
      console.info('\nENV: App built for development!');
      console.info('Log Flags', [
        `LOG_RESOLVER: ${ENV.APP.LOG_RESOLVER}`,
        `LOG_ACTIVE_GENERATION: ${ENV.APP.LOG_ACTIVE_GENERATION}`,
        `LOG_TRANSITIONS: ${ENV.APP.LOG_TRANSITIONS}`,
        `LOG_TRANSITIONS_INTERNAL: ${ENV.APP.LOG_TRANSITIONS_INTERNAL}`,
        `LOG_VIEW_LOOKUPS: ${ENV.APP.LOG_VIEW_LOOKUPS}`,
      ]);
      break;
    }
    case 'test': {
      console.info('\nENV: App built for test!');
      break;
    }
    case 'production': {
      console.info('\nENV: App built for production!');
      break;
    }
    default: {
      // this seems to run before it does
      // the actual build env, so ignore
      // console.info('ENV: App built for unknown environment...');
      break;
    }
  }

  return ENV;
};
