<template>
  <div class="ui-ratings-block">
    <ui-star-icon 
      class="ui-ratings-block__icon"
      :size="size" 
      :color="color"
      v-for="star in prodRate" 
      :key="star.id">
    </ui-star-icon>
  </div>
</template>

<script>
import uiStarIcon from './UI-Icons/ui-star-icon.vue'
export default {
  components: { uiStarIcon },
  name: 'ui-ratings-block',
  data() {
    return {
      size: 22,
      color: '#30af30'
    }
  },
  props: { 
    prodRate: {type: Number, default: 1 } 
  },
}
</script>

<style scoped>
.ui-ratings-block {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.ui-ratings-block__icon {
  flex-basis: 1.4rem;
}
</style>