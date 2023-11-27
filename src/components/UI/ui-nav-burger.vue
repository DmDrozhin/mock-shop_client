<template>
  <div class="ui-nav-burger burger" @click="handleClick()">
    <div 
      class="burger__cursor"
      :class="{ 'active': isActive }"
    ></div>
    <ui-burger-icon
      class="burger__icon"
      :vieBox="viewBox"
      :size="size"
      :color="color1"
      :class="{}"
    ></ui-burger-icon>
    <ui-arrow-filled-icon
      class="burger__arrow"
      :direction="arrow.direction"
      :size="arrow.size"
      :color="color2"
      :viewBox="arrow.viewBox"
    ></ui-arrow-filled-icon>
  </div>
</template>

<script>
// API
// :isActive="false"
// :size="60"
// :color="#fff"
// :viewBox="0 0 16 16"
// @clickBurger="(toggleNAV)"
import uiBurgerIcon from '@/components/UI/UI-Icons/ui-burger-icon.vue'
import uiArrowFilled from '@/components/UI/UI-Icons/ui-arrow-filled-icon.vue'
export default {
  components: { uiBurgerIcon, uiArrowFilled },
  name: 'ui-nav-burger',
  props: {
    isActive: { type: Boolean, default: false },
    size: { type: Number, default: 60 },
    color1: { type: String, default: '#fff' },
    color2: { type: String, default: '#329c26' },
    viewBox: { type: String, default: '0 0 16 16' }
  },
  data() {
    return {}
  },
  computed: {
    arrow() {
      if (this.isActive) {
        return { direction: 'rotate(180)', viewBox: '-1 -1 25 25', size: this.size / 1.2 }
      } else return { direction: 'rotate(0)', viewBox: '0 2 25 25', size: this.size / 1.2 }
    }
  },
  methods: {
    handleClick() { this.$emit('clickBurger') }
  }
}
</script>

<style lang="scss" scoped>
  .ui-nav-burger, 
  .burger {
    display: flex;
    align-items: center;
    position: relative;
    &__cursor {
      position: absolute;
      top: 15%;
      left: -17px;
      width: 15px;
      height: 70%;
      background-color: transparent
    }
    // &__icon {}
    &__arrow {
      position: absolute;
      top: 8px;
      left: 6.5px;
    }
  }
// ADD CLASSES
.active {
  background-color: #329c26;
}
</style>