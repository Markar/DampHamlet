System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  meta: {
    "bootstrap": {
      "deps": [
        "jquery"
      ]
    }
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.2.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.2.5",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.3",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.1",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.2",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.1",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.4",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.2",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.4",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.5",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.1",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "core-js": "npm:core-js@1.2.6",
    "fetch": "github:github/fetch@0.11.1",
    "font-awesome": "npm:font-awesome@4.6.1",
    "jquery": "npm:jquery@2.2.3",
    "lodash": "npm:lodash@4.13.1",
    "phaser": "github:photonstorm/phaser@2.4.8",
    "text": "github:systemjs/plugin-text@0.0.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.4"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "npm:jquery@2.2.3"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.2.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6"
    },
    "npm:aurelia-binding@1.0.0-beta.1.3.5": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.3",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.2",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.4",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.4",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.5",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.1": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.2": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.4": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.2": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.5",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.5": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.2",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.6"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.5",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.2",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.2",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.1"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:font-awesome@4.6.1": {
      "css": "github:systemjs/plugin-css@0.1.21"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@4.13.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  },
  bundles: {
    "aurelia.js": [
      "github:github/fetch@0.11.1.js",
      "github:github/fetch@0.11.1/fetch.js",
      "github:twbs/bootstrap@3.3.6.js",
      "github:twbs/bootstrap@3.3.6/css/bootstrap.css!github:systemjs/plugin-text@0.0.3.js",
      "github:twbs/bootstrap@3.3.6/js/bootstrap.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.1.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.1/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.5.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.5/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.1/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.3/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.1/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.5.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.5/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.3.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.3/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.1.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.1/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0-beta.1.2.1.js",
      "npm:aurelia-history@1.0.0-beta.1.2.1/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.2.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.2/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.1.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.1/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.1.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.1/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.1.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.1/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.1.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.1/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.2.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.2/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-beta.1.2.2.js",
      "npm:aurelia-path@1.0.0-beta.1.2.2/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.4.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.4/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.1/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.0-beta.1.2.2.js",
      "npm:aurelia-router@1.0.0-beta.1.2.2/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.1.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.1/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.4.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.4/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/compile-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/compose.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/focus.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/hide.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/if.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/show.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/view-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.5/with.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.1.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.1/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.1/route-href.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.1/route-loader.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.1/router-view.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.6.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.6/aurelia-templating.js",
      "npm:jquery@2.2.3.js",
      "npm:jquery@2.2.3/dist/jquery.js"
    ],
    "app-build.js": [
      "app.html!github:systemjs/plugin-text@0.0.3.js",
      "app.js",
      "changelog.html!github:systemjs/plugin-text@0.0.3.js",
      "changelog.js",
      "client/game/bosses/blackhole.js",
      "client/game/bosses/boss.js",
      "client/game/extra.js",
      "client/game/items/ammo.js",
      "client/game/items/credits.js",
      "client/game/items/grenade.js",
      "client/game/items/health.js",
      "client/game/items/item.js",
      "client/game/mobs/blackblob.js",
      "client/game/mobs/blackredalien.js",
      "client/game/mobs/bluealien.js",
      "client/game/mobs/dog.js",
      "client/game/mobs/eye.js",
      "client/game/mobs/furryalien.js",
      "client/game/mobs/furryalien2.js",
      "client/game/mobs/grayrobot.js",
      "client/game/mobs/greenalien.js",
      "client/game/mobs/greenalien3.js",
      "client/game/mobs/greenchecker.js",
      "client/game/mobs/greententacle.js",
      "client/game/mobs/mindflayer.js",
      "client/game/mobs/mob.js",
      "client/game/mobs/mobfactory.js",
      "client/game/mobs/octopus.js",
      "client/game/mobs/plasmoid.js",
      "client/game/mobs/psionicist.js",
      "client/game/mobs/rat.js",
      "client/game/mobs/red_alien.js",
      "client/game/mobs/slime.js",
      "client/game/mobs/snake.js",
      "client/game/mobs/spider.js",
      "client/game/mobs/tealalien.js",
      "client/game/mobs/whitealien.js",
      "client/game/mobs/yellowrobot.js",
      "client/game/mobs/zombie.js",
      "client/game/player/ammo.js",
      "client/game/player/consumables.js",
      "client/game/player/inputs.js",
      "client/game/player/inventory.js",
      "client/game/player/item.js",
      "client/game/player/items.js",
      "client/game/player/levels.js",
      "client/game/player/marine/marine.js",
      "client/game/player/marine/marinelevels.js",
      "client/game/player/marine/stimulants.js",
      "client/game/player/player.js",
      "client/game/player/psiops/heal.js",
      "client/game/player/psiops/psilevels.js",
      "client/game/player/psiops/psiops.js",
      "client/game/player/psiops/psiorb.js",
      "client/game/player/psiops/teleport.js",
      "client/game/player/shop.js",
      "client/game/player/skills.js",
      "client/game/player/splicer/splicer.js",
      "client/game/player/splicer/splicerlevels.js",
      "client/game/player/weapons.js",
      "client/game/weapons/abilities/grenade.js",
      "client/game/weapons/assaultrifle.js",
      "client/game/weapons/enemyweapons/enemyweapon.js",
      "client/game/weapons/enemyweapons/fastshot.js",
      "client/game/weapons/enemyweapons/slowshot.js",
      "client/game/weapons/laser.js",
      "client/game/weapons/pistol.js",
      "client/game/weapons/rockets.js",
      "client/game/weapons/shotgun.js",
      "client/game/weapons/weapon.js",
      "damphamlet.html!github:systemjs/plugin-text@0.0.3.js",
      "damphamlet.js",
      "game.html!github:systemjs/plugin-text@0.0.3.js",
      "game.js",
      "index.js",
      "main.js",
      "menu/create.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/create.js",
      "menu/explosives.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/explosives.js",
      "menu/instructions.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/instructions.js",
      "menu/profile.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/profile.js",
      "menu/shopmenu.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/shopmenu.js",
      "menu/talents.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/talents.js",
      "menu/weapons.html!github:systemjs/plugin-text@0.0.3.js",
      "menu/weapons.js",
      "nav-bar.html!github:systemjs/plugin-text@0.0.3.js",
      "old/loader.js",
      "phaser-game.js",
      "sharedstate.js",
      "states/CreatePlayer.js",
      "states/GameState.js",
      "states/Level1.js",
      "states/Level2.js",
      "states/Level3.js",
      "states/MusicHandler.js",
      "states/base.js",
      "states/creator.js",
      "states/loadassets.js",
      "welcome.html!github:systemjs/plugin-text@0.0.3.js",
      "welcome.js"
    ]
  },
  depCache: {
    "client/game/bosses/blackhole.js": [
      "./boss"
    ],
    "client/game/bosses/boss.js": [
      "../items/health",
      "../items/ammo",
      "../weapons/enemyweapons/fastshot",
      "../weapons/enemyweapons/slowshot"
    ],
    "client/game/items/ammo.js": [
      "phaser",
      "./item"
    ],
    "client/game/items/credits.js": [
      "phaser",
      "./item"
    ],
    "client/game/items/grenade.js": [
      "phaser",
      "./item"
    ],
    "client/game/items/health.js": [
      "phaser",
      "./item"
    ],
    "client/game/items/item.js": [
      "phaser"
    ],
    "client/game/mobs/blackblob.js": [
      "./mob"
    ],
    "client/game/mobs/blackredalien.js": [
      "./mob"
    ],
    "client/game/mobs/bluealien.js": [
      "./mob"
    ],
    "client/game/mobs/dog.js": [
      "./mob"
    ],
    "client/game/mobs/eye.js": [
      "phaser",
      "./mob",
      "../weapons/enemyweapons/slowshot"
    ],
    "client/game/mobs/furryalien.js": [
      "./mob"
    ],
    "client/game/mobs/furryalien2.js": [
      "./mob"
    ],
    "client/game/mobs/grayrobot.js": [
      "./mob"
    ],
    "client/game/mobs/greenalien.js": [
      "./mob"
    ],
    "client/game/mobs/greenalien3.js": [
      "./mob"
    ],
    "client/game/mobs/greenchecker.js": [
      "./mob"
    ],
    "client/game/mobs/greententacle.js": [
      "./mob"
    ],
    "client/game/mobs/mindflayer.js": [
      "./mob"
    ],
    "client/game/mobs/mob.js": [
      "../items/health",
      "../items/ammo",
      "../items/credits",
      "../weapons/enemyweapons/slowshot"
    ],
    "client/game/mobs/mobfactory.js": [
      "phaser"
    ],
    "client/game/mobs/octopus.js": [
      "./mob"
    ],
    "client/game/mobs/plasmoid.js": [
      "./mob"
    ],
    "client/game/mobs/psionicist.js": [
      "./mob"
    ],
    "client/game/mobs/rat.js": [
      "./mob"
    ],
    "client/game/mobs/red_alien.js": [
      "./mob"
    ],
    "client/game/mobs/slime.js": [
      "./mob"
    ],
    "client/game/mobs/snake.js": [
      "./mob"
    ],
    "client/game/mobs/spider.js": [
      "./mob"
    ],
    "client/game/mobs/tealalien.js": [
      "./mob"
    ],
    "client/game/mobs/whitealien.js": [
      "./mob"
    ],
    "client/game/mobs/yellowrobot.js": [
      "./mob"
    ],
    "client/game/mobs/zombie.js": [
      "./mob"
    ],
    "client/game/player/consumables.js": [
      "./item"
    ],
    "client/game/player/marine/marine.js": [
      "../player",
      "../inputs",
      "./marinelevels",
      "./stimulants"
    ],
    "client/game/player/marine/marinelevels.js": [
      "../levels"
    ],
    "client/game/player/player.js": [
      "../weapons/laser",
      "../weapons/pistol",
      "../weapons/rockets",
      "../weapons/assaultrifle",
      "../weapons/shotgun",
      "../items/ammo",
      "../weapons/abilities/grenade",
      "./items",
      "./skills",
      "./inventory",
      "./shop",
      "./inputs"
    ],
    "client/game/player/psiops/psilevels.js": [
      "../levels"
    ],
    "client/game/player/psiops/psiops.js": [
      "../player",
      "../inputs",
      "./psiorb",
      "./psilevels",
      "./heal",
      "./teleport"
    ],
    "client/game/player/shop.js": [
      "./items"
    ],
    "client/game/player/splicer/splicer.js": [
      "../player",
      "../inputs",
      "./splicerlevels"
    ],
    "client/game/player/splicer/splicerlevels.js": [
      "../levels"
    ],
    "client/game/player/weapons.js": [
      "./item"
    ],
    "client/game/weapons/assaultrifle.js": [
      "./weapon"
    ],
    "client/game/weapons/enemyweapons/fastshot.js": [
      "./enemyweapon"
    ],
    "client/game/weapons/enemyweapons/slowshot.js": [
      "./enemyweapon"
    ],
    "client/game/weapons/laser.js": [
      "./weapon"
    ],
    "client/game/weapons/pistol.js": [
      "./weapon"
    ],
    "client/game/weapons/rockets.js": [
      "./weapon"
    ],
    "client/game/weapons/shotgun.js": [
      "./weapon"
    ],
    "damphamlet.js": [
      "../build/scripts/phaser.js",
      "jquery",
      "lodash",
      "./states/GameState",
      "./states/base",
      "./states/Level1",
      "./states/Level2",
      "./states/Level3",
      "./client/game/player/marine/marine",
      "./client/game/player/psiops/psiops",
      "./client/game/player/splicer/splicer",
      "aurelia-framework",
      "./sharedstate"
    ],
    "game.js": [
      "../build/scripts/phaser.js",
      "jquery",
      "lodash",
      "./states/GameState",
      "./states/base",
      "./states/Level1",
      "./states/Level2",
      "./states/Level3",
      "./client/game/player/marine/marine",
      "./client/game/player/psiops/psiops",
      "./client/game/player/splicer/splicer"
    ],
    "index.js": [
      "./states/GameState",
      "./states/base",
      "./states/Level1",
      "./states/Level2",
      "./states/Level3",
      "./client/game/player/marine/marine",
      "./client/game/player/psiops/psiops",
      "./client/game/player/splicer/splicer",
      "jquery",
      "lodash",
      "phaser"
    ],
    "main.js": [
      "bootstrap"
    ],
    "menu/shopmenu.js": [
      "aurelia-framework",
      "../client/game/player/items"
    ],
    "old/loader.js": [
      "jquery"
    ],
    "states/base.js": [
      "../client/game/player/player",
      "./creator",
      "../client/game/items/item",
      "../client/game/items/health",
      "./MusicHandler",
      "lodash"
    ],
    "states/CreatePlayer.js": [
      "../client/game/player/player",
      "lodash"
    ],
    "states/creator.js": [
      "../client/game/mobs/eye",
      "../client/game/mobs/slime",
      "../client/game/mobs/greenalien",
      "../client/game/mobs/red_alien",
      "../client/game/mobs/octopus",
      "../client/game/mobs/rat",
      "../client/game/mobs/tealalien",
      "../client/game/mobs/furryalien",
      "../client/game/mobs/spider"
    ],
    "states/GameState.js": [
      "../client/game/player/player",
      "../client/game/items/item",
      "../client/game/items/health",
      "./loadassets",
      "./MusicHandler"
    ],
    "states/Level1.js": [
      "../client/game/player/player",
      "../client/game/bosses/blackhole",
      "./creator",
      "../client/game/items/item",
      "../client/game/items/health",
      "lodash"
    ],
    "states/Level2.js": [
      "../client/game/player/player",
      "./creator"
    ],
    "states/Level3.js": [
      "../client/game/player/player",
      "../client/game/bosses/blackhole",
      "./creator",
      "../client/game/items/item",
      "../client/game/items/health",
      "lodash"
    ],
    "welcome.js": [
      "game"
    ]
  }
});