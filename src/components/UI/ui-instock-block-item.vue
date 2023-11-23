<template>
  <div class="ui-instock-block-item">
    <div class="ui-instock-block-item__size">{{ instockEl.sz }}</div>
    <div class="ui-instock-block-item__qt">{{ instockEl.qt }}</div>
    <ui-check-icon
      v-if="status" 
      class="ui-instock-block__icon"
      :size="size" 
      :color="currentColor"
    >
    </ui-check-icon>
    <ui-cross-icon
      v-if="!status"
      class="ui-instock-block__icon"
      :size="size"
      :color="currentColor"
    >
    </ui-cross-icon>
  
  </div>
</template>

<script>
export default {
  name: 'ui-instock-block-item',
  data() {
    return {
      size: 12,
    }
  },
  props: { 
    instockEl: {type: Object, default: () => {} }
  },
  computed: {
    status() { return this.instockEl.qt > 0 ? true : false },
    currentColor() { return this.status ? '#30af30' : '#424242' }
  }
}
</script>

<style scoped>
.ui-instock-block-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 24px;
  z-index: -1;
}
.ui-instock-block-item__size {
  font-size: 0.8rem;
  text-transform: uppercase;
}
.ui-instock-block-item__qt {
  font-size: 0.8rem;
  color: gray;
}
</style>