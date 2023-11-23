<template>
  <button class="delete-btn" @click="deleteItem()">
    <div class="flex-wrapper">
      <span class="delete-btn__icon">
        <i class="material-icons">delete_forever</i>
      </span>
      <p class="delete-btn__title">Видалити</p>
    </div>
  </button>
</template>

<script>
export default {
  name:'ui-delete-button',
  methods: {
    deleteItem() {
      this.$emit('deleteItem')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.delete-btn {
  appearance: none;
  border-style: none;
  background-color: transparent;
  position: relative;
  &__icon i {
    color: $warn-txt;
  }
}
.delete-btn:hover::after {
  content: '';
  position: absolute;
  display: block;
  width: 10px;
  height: 100%;
  top: 0;
  right: -15px;
  background-color: $warn-txt;
}
</style>