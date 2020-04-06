<template>
    <div :class="dropdown.visible ? dropDownHeight : ''" class="container select w-84 md:w-full">
        <div class="relative">
            <input
                    :placeholder="placeholder"
                    :required='required'
                    class="cursor-pointer border border-a4a-form-border w-full focus:outline-none py-2 px-3 mr-3"
                    v-model="chosen"
                    @focus="toggle"
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
                     v-for="(option, index) in selectData">
                    <p @click="setValue(option)" class="w-84 md:w-96 p-3 border-b border-a4a-form-border">
                        {{ option.name }}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'FormSelect',
    props: {
      error: {
        type: Boolean,
      },
      errorMessage: {
        type: String,
      },
      options: {
        type: [Array, Object],
      },
      placeholder: {
        type: String,
        default: 'Select a option',
      },
      dropDownHeight: {
        type: String,
        default: 'h-72',
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        dropdown: {
          visible: false,
        },
        chosen: '',
        selectData: []
      }
    },
    computed: {
      computedOptions() {
        return this.selectData;
      }
    },
    methods: {
      search (e) {
        let key = e.keyCode || e.charCode
        console.log(this.computedOptions)
        if (key === 8 || key === 46) {
          console.log('assigning options to selectData')
          console.log(this.computedOptions)
          this.selectData = this.computedOptions
        }
        this.selectData = this.filter(e)
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
      setValue (option) {
        this.chosen = option.name
        this.$emit('input', option.code)
        this.toggle()
      },
    },
    mounted () {
      console.log(this.options)
      this.selectData = this.options
    }
  }
</script>
<style scoped>
    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
        transition-property: opacity, transform;
    }

    .list-enter {
        opacity: 0;
        transform: translateX(50px) scaleY(0.5);
    }

    .list-enter-to {
        opacity: 1;
        transform: translateX(0) scaleY(1);
    }

    .list-leave-active {
        position: absolute;
    }

    .list-leave-to {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: center top;
    }
</style>
