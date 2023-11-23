<template>
  <div class="ui-order-button container">
    <div class="container__front-icon" v-if="frontIcon">
      <i 
        class="material-icons" 
        :style="{ 'color': currentColor }"
      >
        {{ frontIcon }}
      </i>
    </div>
    <div 
      class="container__ui-button ui-button"
      :style="{ 'border-color': currentColor, 'color': currentColor }"
      @click="handlePrompt($event)"
    >
      <div class="ui-button__wrapper">
        <i
          class="material-icons"
          :style="{'color': currentColor}"
        >
          {{ icon }}
        </i>
        <slot class="ui-button__slot"></slot>
      </div>
      <div 
        class="ui-button__cursor"
        :style="{'background-color': currentColor}"
      ></div>
    </div>
  </div>
</template>

<script>
// API
// :isActive="true"
// :frontIcon="'double_arrow'"
// :icon="'shopping_cart'"
// :color="'#fff'"
// @handlePrompt="handleAnswer()"
export default {
  name: 'ui-order-button',
  props: {
    icon: { type: String, default: 'shopping_cart' },
    frontIcon: { type: String|Boolean, default: 'double_arrow' },
    color: { type: String, default: '#329c26' },
    isActive: { type: Boolean, default: true },
  },
  computed: {
    currentColor() {
      return this.isActive ? this.color : '#aaa'
    }
  },
  methods: {
    handlePrompt(event) {
      event.preventDefault()
      this.$emit('handlePrompt')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
$brd-width: 1px;
.ui-order-button,
.container {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  &__front-icon {

  }
  &__ui-button, 
  .ui-button {
    width: 100%;
    padding: .6rem 1rem;
    background: transparent;
    border-radius: $base-radius;
    border: $brd-width solid $green-btn;
    cursor: pointer;
    position: relative;
    &__wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    &__slot {

    }
    &__cursor {
    }
    &:hover {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:hover .ui-button__cursor {
      position: absolute;
      top: -$brd-width;
      right: -10px;
      height: calc(100% + $brd-width * 2);
      width: 10px;
    }
  }
}
</style>