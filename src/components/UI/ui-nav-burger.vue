<template>
  <div class="ui-nav-burger burger" @click="handleClick()">
    <div 
      class="burger__cursor"
      :class="{ 'burger__cursor-active': isActive }"
    ></div>
    <ui-burger-icon
      class="burger__icon"
      :vieBox="viewBox"
      :size="size"
      :color="color"
      :class="{}"
    ></ui-burger-icon>
    <ui-arrow-filled-icon
      class="burger__arrow"
      :direction="arrow.direction"
      :size="arrow.size"
      :color="color"
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
    color: { type: String, default: '#fff' },
    viewBox: { type: String, default: '0 0 16 16' }
  },
  data() {
    return {}
  },
  computed: {
    arrow() {
      if (this.isActive) {
        return { direction: 'rotate(180)', viewBox: '0 0 25 25', size: this.size / 2 }
      } else return { direction: 'rotate(0)', viewBox: '0 2 25 25', size: this.size / 2 }
    }
  },
  methods: {
    handleClick() { this.$emit('clickBurger') }
  }
}
</script>

<style scoped>
  .ui-nav-burger {
    display: flex;
    align-items: center;
    position: relative;
  }
  .burger__cursor {
    position: absolute;
    top: 15%;
    left: -17px;
    width: 15px;
    height: 70%;
    background-color: transparent;
  }
  .burger__cursor-active {
    background-color: #329c26;
  }
</style>