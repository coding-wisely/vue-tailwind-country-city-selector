<template>
    <div>
        <form-select :options="countries" v-model="selectedCountry" @input="generateStates"/>
        <form-select :options="computedStates" v-model="selectedState" v-if="showStates" @input="generateCities"/>
        <form-select :options="computedCities" v-model="selectedCity" v-if="showCities"/>
    </div>
</template>

<script>
    import CountryList from 'countries.json'
    import FormSelect from "./components/FormSelect";
    /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

    export default {
        name: "vue-tailwind-country-city-selector",
        components: {FormSelect},
        data() {
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
            computedStates() {
                if (this.selectedCountry) {
                    return this.states;
                }
                return {};
            },
            computedCities() {
                if (this.showCities) {
                    return this.cities;
                }
                return {};
            }
        },
        methods: {
            generateStates() {
                this.showStates = false;
                this.showCities = false;
                this.states = {};
                this.cities = {};

                let states = [];
                this.countries.forEach((country, index) => {
                    if (country.name === this.selectedCountry) {
                        if (this.countryList[index].hasOwnProperty("states")) {
                            let stateList = this.countryList[index].states;
                            this.stateList = stateList;
                            Object.keys(stateList).forEach((item) => {
                                let name = item;
                                states.push({name})
                            });
                            this.showStates = true;
                        }
                    }
                });
                this.states = states;
            },
            generateCities() {
                let cities = [];
                console.log(this.selectedState)

                Object.keys(this.stateList).forEach((item) => {
                    console.log(item)
console.log(this.stateList)
                    if (item === this.selectedState) {
                        this.stateList[item].forEach((name) => {
                            // console.log(name)
                            cities.push({name})
                        })
                    }
                });
                this.showCities = true;
                this.cities = cities;
            }
        },
        created() {
            let countries = [];
            this.countryList.forEach((country) => {
                let name = country.name;
                countries.push({name})
            });
            this.countries = countries;
        }
    }
</script>

<style scoped>
    @import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";

</style>
