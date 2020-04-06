<template>
    <div>
        <div>
            <div :class="dropdown.visible ? 'w-72' : ''" class="container select w-84 md:w-full">
                <div class="relative">
                    <input
                            placeholder="Please select country"
                            required='required'
                            class="cursor-pointer border border-a4a-form-border w-full focus:outline-none py-2 px-3 mr-3"
                            @focus="toggle"
                            v-model="selectedCountryName"
                            @keyup="searchCountries($event)"
                    >
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" v-if="!dropdown.visible">
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" v-else>
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/>
                        </svg>
                    </div>
                </div>
                <transition name="list">
                    <div class="container absolute border w-84 md:w-96 rounded-b bg-a4a-form-background "
                         v-if="dropdown.visible">
                        <div :key="index" class="last:border-b-0 hover:a4a-very-light-grey cursor-pointer"
                             v-for="(option, index) in countries">
                            <p @click="setCountry(option)" class="w-84 md:w-96 p-3 border-b border-a4a-form-border">
                                {{ option.name }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div v-if="Object.keys(computedStates).length > 0">
            <div :class="dropdown.visible ? 'w-72' : ''" class="container select w-84 md:w-full">
                <div class="relative">
                    <input
                            placeholder="Please select state"
                            required='required'
                            class="cursor-pointer border border-a4a-form-border w-full focus:outline-none py-2 px-3 mr-3"
                            @focus="toggle"
                            v-model="selectedStateName"
                            @keyup="search($event)"
                    >
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" v-if="!dropdown.visible">
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" v-else>
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"/>
                        </svg>
                    </div>
                </div>
                <transition name="list">
                    <div class="container absolute border w-84 md:w-96 rounded-b bg-a4a-form-background "
                         v-if="dropdown.visible">
                        <div :key="index" class="last:border-b-0 hover:a4a-very-light-grey cursor-pointer"
                             v-for="(option, index) in states">
                            <p @click="setState(option)" class="w-84 md:w-96 p-3 border-b border-a4a-form-border">
                                {{ option.name }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div v-if="Object.keys(computedCities).length > 0">

        </div>
    </div>
</template>

<script>
  import * as countries from './new/countries.json'
  import * as states from './new/states.json'
  import * as cities from './new/cities.json'
  // import FormSelect from './components/FormSelect'

  const CountryList = countries.default

  const StateList = states.default

  const CitiesList = cities.default

  /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  export default {
    name: 'vue-tailwind-country-city-selector',
    // components: { FormSelect },
    data () {
      return {
        dropdown: {
          visible: false
        },
        countryList: CountryList,
        stateList: StateList,
        citiesList: {},
        countries: {},
        states: {},
        cities: {},
        selectedCountryName: '',
        selectedStateName: '',
        selectedCityName: '',
        selectedCountryCode: '',
        selectedStateId: '',
      }
    },
    computed: {
      computedStates () {
        if (this.states) {
          return this.states
        } else {
          return false
        }
      },
      computedCities () {
        if (this.cities) {
          return this.cities
        } else {
          return false
        }
      }
    },
    methods: {
      searchCountries (e) {
        let key = e.keyCode || e.charCode
        if (key === 8 || key === 46) {
          this.selectData = this.computedOptions
        }
        let result = []
        this.countries = () => {this.selectData.filter((record) => {

          if ((record.name).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
            let name = record.name
            let code = record.code
            result.push({ code, name })
          }
        })
        return [...new Set(result)]}
      },
      filter (e) {
        let result = []
        this.selectData.filter((record) => {
          if ((record.name).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
            let name = record.name
            let code = record.code
            result.push({ code, name })
          }
        })

        return [...new Set(result)]
      },
      toggle () {
        this.dropdown.visible = !this.dropdown.visible
      },
      setCountry(option) {console.log(option)
        this.selectedCountryName = option.name
        this.selectedCountryCode = option.code
        this.generateStates();
        this.toggle()
      },
      setState(option) {
        this.selectedStateName = option.name
        this.selectedStateId = option.code;
        this.generateCities();
        this.toggle()
      },
      generateCountries () {
        let countries = []
        this.countryList.forEach((country) => {
          let name = country.name
          let code = country.code
          countries.push({ code, name })
        })
        this.countries = countries
      },
      generateStates() {
        this.states = StateList.filter((state) => state.country_code === this.selectedCountryCode)
      },
      generateCities() {
        this.cities = CitiesList.filter((city) => (city.state_id === this.selectedStateId && city.country_code === this.selectedCountryCode) )
      }
    },
    created () {
      this.generateCountries()
    }
  }
</script>

<style scoped>
    @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";
</style>
