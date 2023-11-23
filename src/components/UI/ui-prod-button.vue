<template>
  <button 
    class="ui-prod-button button" 
    :disabled="!okStatus"
    @click="handleClick()">
    <div class="button__wrapper">
      <div class="button__icon-wrapper">
        <i class="button__icon material-icons">{{ current.icon }}</i>
      </div>
      <span class="button__text">{{ current.txt }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ui-prod-button',
  data () {
    return {
      toCart: { txt: 'в кошик', icon: 'add_shopping_cart' },
      update: { txt: 'вже в кошику', icon: 'shopping_cart_checkout' },
      // outOfStock: { txt: 'Відсутній', icon: 'remove_shopping_cart' },
      outOfStock: { txt: 'в кошик', icon: 'add_shopping_cart' },
    }
  },

  props: {
    isInStock: { type: Boolean, default: true },
    isInCart: { type: Boolean, default: false },
    isWarn: { type: Boolean, default: false }
  },
  methods: {
    handleClick () {
      this.$emit('handleClick')
    }
  },
  computed: {
    okStatus () {
      return (this.isInStock && !this.isWarn) ? true : false
    },
    current () {
      if (this.isInStock && !this.isInCart) return this.toCart
      if (this.isInStock && this.isInCart) return this.update
      if (!this.isInStock) return this.outOfStock
    }
  }
} 

</script>

<style lang="scss" scoped>
@import '@/styles/styles.scss';
.ui-prod-button,
.button {
  padding: 0rem 0.8rem;
  background: transparent;
  border-radius: $base-radius;
  border: 2px solid $green-btn;
  // min-width: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  position: relative;
  // cursor: default;
  
  &:hover {
    outline: 2px solid $green-btn;
    transition: all ease 100ms;
  }
  &:disabled {
    border: 1px solid $icon-color;
  }
  &:disabled &__text, &__icon {
    color: $icon-color;
  }
  &:disabled:hover{
    outline: 2px solid $icon-color;
    transition: all ease 100ms;
  }
  &:disabled:hover::before {
    content: "виберіть розмір";
    display: block;
    position: absolute;
    left: 5px;
    top: -25px;
    color: black;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // &__icon-wrapper {

  // }
  &__icon {
    padding: 0.6rem 0;
  }
  &__text {
    flex-shrink: 1;
    text-align: center;
    color: $green-btn;
    line-height: 1.1;
  }
}

</style>