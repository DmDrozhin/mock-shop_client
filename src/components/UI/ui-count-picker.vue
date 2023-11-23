<template>
  <!-- the component includes 'ui-arrow-filled-icon' from UI folder -->
  <div class="ui-custom-count-picker picker">
    <div class="picker__label" v-if="label">
      {{ label }}
    </div>
    <div class="picker__wrapper">
      <div
        class="picker__arrow"
        @click="clickedUP"
      >
        <ui-arrow-filled-icon
          :color="colorTop"
          :size="size"
          :direction="directionTop"
          :viewBox="'0 -5 24 24'"
        ></ui-arrow-filled-icon>
      </div>

      <div class="picker__num">
        {{ value }}
      </div>

      <div
        class="picker__arrow"
        @click="clickedDOWN"
      >
        <ui-arrow-filled-icon
          :color="colorBottom"
          :size="size"
          :direction="directionBottom"
          :viewBox="'0 -3 24 24'"
        ></ui-arrow-filled-icon>
      </div>

    </div>

  </div>
</template>

<script>
// API >>>>>>>>>>>
// :value="Number"
// :maxValue="Number"
// :minValue="Number"
// :label="'text'"
// @clicked="clickHandler($event)" // returns +1 or -1
export default {
  name: 'ui-count-picker',
  props: {
    value: { type: Number, default: 1, required: true },
    maxValue: { type: Number, default: 1 },
    minValue: { type: Number, default: 1 },
    label: { type: String, default: '' }
  },
  data() {
    return {
      size: 30,
      directionTop: 'rotate(0)',
      directionBottom: 'rotate(180)',
      hoverColor: '#30af30',
    }
  },
  computed: {
    status() { return this.value > 0 ? true : false },
    isMAXvalue () { return this.value >= this.maxValue },
    isMINvalue () { return this.value <= this.minValue },
    colorTop () { return this.isMAXvalue ? '#8a8a8a' : 'rgb(178, 214, 182)' },
    colorBottom () { return this.isMINvalue ? '#8a8a8a' : 'rgb(178, 214, 182)' }
  },
  methods: {
    clickedUP() {
      if (!this.isMAXvalue) {
        this.$emit('clicked', 1) 
      }
    },
    clickedDOWN() {
      if (!this.isMINvalue) {
        this.$emit('clicked', -1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ui-custom-count-picker,
.picker{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // gap: 0rem;
  }
  &__wrapper:hover::before {
    content: '';
    display: block;
    height: 5px;
    width: 60px;
    position: absolute;
    top: 63px;
    left: -65px;
    background-color: rgb(21, 193, 32);
  }
  &__label {
    font-size: 1rem;
  }
  &__num {
    display: grid;
    place-items: center;
    border: 1px solid rgb(21, 193, 32);
    border-radius: 3px;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(16, 108, 112);
    height: 2.5rem;
    width: 3.5rem;
  }
}
</style>