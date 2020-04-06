<template>
    <div>
        <div ><form-select :options="countries" v-model="selectedCountry" @input="generateStates"/></div>
        <div v-if="Object.keys(computedStates).length > 0"><form-select :options="computedStates" v-model="selectedState"  @input="generateCities"/></div>
        <div v-if="Object.keys(computedCities).length > 0"><form-select :options="computedCities" v-model="selectedCity" v-if="computedCities"/>{{ computedCities }}</div>
    </div>
</template>

<script>
  import * as countries from './new/countries.json'
  const CountryList = countries.default;

  import * as states from './new/states.json'
  const StateList = states.default;

  import * as cities from './new/cities.json'
  const CitiesList = cities.default;

  import FormSelect from './components/FormSelect'
  /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  export default {
    name: 'vue-tailwind-country-city-selector',
    components: { FormSelect },
    data () {
      return {
        countryList: CountryList,
        stateList: StateList,
        citiesList: CitiesList,
        countries: {},
        states: {},
        cities: {},
        selectedCountry: '',
        selectedState: '',
        selectedCity: '',
      }
    },
    computed: {
      computedStates () {
        if (this.states) {
          return this.states
        }else{
          return false;
        }
      },
      computedCities () {
        if (this.showCities) {
          return this.cities
        }else{
          return {}
        }

      }
    },
    methods: {
      generateStates () {
        this.states = {};
        let states = StateList.filter((state)=>state.country_code === this.selectedCountry);
        this.showStates = true
        this.states = states
      },
      generateCities () {
        let cities = CitiesList.filter((city)=>city.state_id === this.selectedState);
        this.showCities = true
        this.cities = cities
      }
    },
    created () {
      let countries = []
      this.countryList.forEach((country) => {
        let name = country.name
        let code = country.code
        countries.push({ code, name })
      })
      this.countries = countries
    }
  }
</script>

<style scoped>
    @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";

</style>
