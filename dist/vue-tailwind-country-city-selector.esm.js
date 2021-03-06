import CountryList from 'countries.json';
import FormSelect from 'components/FormSelect';

//
    /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

    var script = {
        name: "vue-tailwind-country-city-selector",
        components: {FormSelect: FormSelect},
        data: function data() {
            return {
                countryList: CountryList,
                stateList: {},
                countries: {},
                cities: {},
                selectedCountry: '',
                selectedState: '',
                selectedCity: '',
                showStates: false,
                showCities: false
            }
        },
        computed: {
            computedStates: function computedStates() {
                if (this.selectedCountry) {
                    return this.states;
                }
                return {};
            },
            computedCities: function computedCities() {
                if (this.showCities) {
                    return this.cities;
                }
                return {};
            }
        },
        methods: {
            generateStates: function generateStates() {
                var this$1 = this;

                this.showStates = false;
                this.showCities = false;
                this.states = {};
                this.cities = {};

                var states = [];
                this.countries.forEach(function (country, index) {
                    if (country.name === this$1.selectedCountry) {
                        if (this$1.countryList[index].hasOwnProperty("states")) {
                            var stateList = this$1.countryList[index].states;
                            this$1.stateList = stateList;
                            Object.keys(stateList).forEach(function (item) {
                                var name = item;
                                states.push({name: name});
                            });
                            this$1.showStates = true;
                        }
                    }
                });
                this.states = states;
            },
            generateCities: function generateCities() {
                var this$1 = this;

                var cities = [];
                console.log(this.selectedState);

                Object.keys(this.stateList).forEach(function (item) {
                    console.log(item);
console.log(this$1.stateList);
                    if (item === this$1.selectedState) {
                        this$1.stateList[item].forEach(function (name) {
                            // console.log(name)
                            cities.push({name: name});
                        });
                    }
                });
                this.showCities = true;
                this.cities = cities;
            }
        },
        created: function created() {
            var countries = [];
            this.countryList.forEach(function (country) {
                var name = country.name;
                countries.push({name: name});
            });
            this.countries = countries;
        }
    };

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c("form-select", {
        attrs: { options: _vm.countries },
        on: { input: _vm.generateStates },
        model: {
          value: _vm.selectedCountry,
          callback: function($$v) {
            _vm.selectedCountry = $$v;
          },
          expression: "selectedCountry"
        }
      }),
      _vm._v(" "),
      _vm.showStates
        ? _c("form-select", {
            attrs: { options: _vm.computedStates },
            on: { input: _vm.generateCities },
            model: {
              value: _vm.selectedState,
              callback: function($$v) {
                _vm.selectedState = $$v;
              },
              expression: "selectedState"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.showCities
        ? _c("form-select", {
            attrs: { options: _vm.computedCities },
            model: {
              value: _vm.selectedCity,
              callback: function($$v) {
                _vm.selectedCity = $$v;
              },
              expression: "selectedCity"
            }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-cfc27506_0", { source: "\n@import \"https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css\";\n\n", map: {"version":3,"sources":["/Users/vladimir/Projects/npm/vue-tailwind-country-city-selector/src/vue-tailwind-country-city-selector.vue"],"names":[],"mappings":";AAgGA,kEAAA","file":"vue-tailwind-country-city-selector.vue","sourcesContent":["<template>\n    <div>\n        <form-select :options=\"countries\" v-model=\"selectedCountry\" @input=\"generateStates\"/>\n        <form-select :options=\"computedStates\" v-model=\"selectedState\" v-if=\"showStates\" @input=\"generateCities\"/>\n        <form-select :options=\"computedCities\" v-model=\"selectedCity\" v-if=\"showCities\"/>\n    </div>\n</template>\n\n<script>\n    import CountryList from 'countries.json'\n    import FormSelect from \"components/FormSelect\";\n    /* eslint no-console: [\"error\", { allow: [\"warn\", \"error\", \"log\"] }] */\n\n    export default {\n        name: \"vue-tailwind-country-city-selector\",\n        components: {FormSelect},\n        data() {\n            return {\n                countryList: CountryList,\n                stateList: {},\n                countries: {},\n                cities: {},\n                selectedCountry: '',\n                selectedState: '',\n                selectedCity: '',\n                showStates: false,\n                showCities: false\n            }\n        },\n        computed: {\n            computedStates() {\n                if (this.selectedCountry) {\n                    return this.states;\n                }\n                return {};\n            },\n            computedCities() {\n                if (this.showCities) {\n                    return this.cities;\n                }\n                return {};\n            }\n        },\n        methods: {\n            generateStates() {\n                this.showStates = false;\n                this.showCities = false;\n                this.states = {};\n                this.cities = {};\n\n                let states = [];\n                this.countries.forEach((country, index) => {\n                    if (country.name === this.selectedCountry) {\n                        if (this.countryList[index].hasOwnProperty(\"states\")) {\n                            let stateList = this.countryList[index].states;\n                            this.stateList = stateList;\n                            Object.keys(stateList).forEach((item) => {\n                                let name = item;\n                                states.push({name})\n                            });\n                            this.showStates = true;\n                        }\n                    }\n                });\n                this.states = states;\n            },\n            generateCities() {\n                let cities = [];\n                console.log(this.selectedState)\n\n                Object.keys(this.stateList).forEach((item) => {\n                    console.log(item)\nconsole.log(this.stateList)\n                    if (item === this.selectedState) {\n                        this.stateList[item].forEach((name) => {\n                            // console.log(name)\n                            cities.push({name})\n                        })\n                    }\n                });\n                this.showCities = true;\n                this.cities = cities;\n            }\n        },\n        created() {\n            let countries = [];\n            this.countryList.forEach((country) => {\n                let name = country.name;\n                countries.push({name})\n            });\n            this.countries = countries;\n        }\n    }\n</script>\n\n<style scoped>\n    @import \"https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css\";\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-cfc27506";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component
// Declare install function executed by Vue.use()
function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('VueTailwindCountryCitySelector', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
    install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
