<template>
  <!-- the component includes 'ui-arrow-filled-icon' from UI folder -->
  <div class="ui-custom-select select">
    <div class="select__box" ref="select" @click="toggleOptionsList">
      <div class="select__output">
        {{ optionValue }}
      </div>
      <div class="select__icon">
        <ui-arrow-filled-icon 
          :direction="arrowDirection" 
          :size="30"
          :color="color"
          :viewBox="'0 0 24 24'" 
        />
      </div>
    </div>
    <ul class="select__dropdown-list options-list" v-if="isRolledOut">
      <li
        class="option-item"
        v-for="option in options"
        :key="option.id"
        @click="handleSelector(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ui-custom-select',
  data() {
    return {
      color: 'rgb(178, 214, 182)',
      isRolledOut: false,
    }
  },
  props: {
    optionValue: { type: String | undefined },
    options: { type: Array, default: () => [] },
  },
  watch: {
    CLICKED_DOM_ELEMENT(trg) {
      const domEl = 'option-item'
      if (this.isRolledOut && trg !== domEl) {
        this.isRolledOut = false
      }
    },
  },
  computed: {
    ...mapGetters(['CLICKED_DOM_ELEMENT']),
    arrowDirection() { return this.isRolledOut ? 'rotate(0)' : 'rotate(180)' },
  },

  methods: {
    toggleOptionsList() {
      this.isRolledOut = !this.isRolledOut
    },
    handleSelector(prop) {
      this.$emit('on-select', prop)
      this.isRolledOut = false
    },
  }
}
</script>

<style scoped>
.select {
  position: relative;
  z-index: 1;
  border: 1px solid rgb(21, 193, 32);
  border-radius: 3px;
}
.select::before {
  content: 'вибір розміру';
  display: block;
  position: absolute;
  left: 0;
  top: -40px;
  width: 100%;
}
.select:hover::after {
  content: '';
  position: absolute;
  top: -1px;
  right: 0px;
  display: block;
  height: calc(100% + 2px);
  width: 10px;
  background-color: #30af30;
}
.select__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.7rem;
  border: 1px solid #fff;
  border-radius: 3px;
  z-index: -1;
}
.select__output {
  z-index: -1;
  color: rgb(56, 56, 56);
  text-transform: uppercase;
  flex-grow: 1;
  text-align: center;
  /* border: 1px solid rgb(114, 178, 17); */
}
.select__icon {
  /* border: 1px solid rgb(255, 245, 47); */
  z-index: -1;
  display: grid;
  place-items: center;
}

/* DROPDOWN LIST */
.options-list {
  display: block;
  width: 100%;
  list-style: none;
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  z-index: -1;
  box-shadow: 2px 2px 10px gray;
}
.option-item {
  border: 1px solid rgb(178, 178, 178);
  border-bottom: none;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  position: relative;
  text-transform: uppercase;
  text-align: center;
  z-index: 1;
}
.option-item:last-child {
  border-bottom: 1px solid rgb(178, 178, 178);
}
.option-item:hover {
  background-color: rgb(213, 213, 213);
  cursor: default;
}
.option-item:hover:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 100%;
  width: 10px;
  background-color: #30af30;
}
</style>
