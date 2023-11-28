<template>
  <div class="ui-cancel-button cancel" @click="handleClick()"> 
    <div class="cancel__label">{{ label }}</div>
    <ui-cross-cancel-icon
      class="cancel__icon"
      :size="size"
      :color="color"
      :viewBox="viewBox"
    ></ui-cross-cancel-icon>
  </div>
  
</template>

<script>
// API
// :size="30"
// :color="'#d86f6f'"  
// :viewBox="'0 0 32 32'"
// :label="'string'"
// @cancel="handle"
import uiCrossCancelIcon from '@/components/UI/UI-Icons/ui-cross-cancel-icon.vue'
export default {
  components: { uiCrossCancelIcon },
  name: 'ui-cancel-button',
  props: {
    size: { type: Number, default: 25 },
    color: { type: String, default: '#d86f6f' },
    viewBox: { type: String, default: '0 0 32 32' },
    label: { type: String, default: '' },
  },
  methods: {
    handleClick() { this.$emit('cancel') }
  }
}
</script>

<style lang="scss" scoped>
  .ui-cancel-button, 
  .cancel {
    position: relative;
    &__label {}
    &__icon {}
    &:hover::before {
      content: 'Відмінити';
      position: absolute;
      top: 0.4rem;
      left: -5rem;
      color: #d86f6f;
      font-weight: 600;
    }
    &:hover::after {
      content: '';
      display: block;
      position: absolute;
      top: 0rem;
      right: -0.7rem;
      width: 8px;
      height: 90%;
      background-color: #d86f6f;
    }
  }
</style>