<template>
  <div class="ui-404-page">
    <div class="warn-block flex-wrapper">
      <h1>{{ title | toUpp }}</h1>
      <h1>{{ message | toUpp }}</h1>
    </div>
  </div>
</template>

<script>
import toUpp from '@/filters/toUpperCase'
export default {
  data () {
    return {
      title: 'ERROR 404!',
      message: 'сторінка не знайдена'
    }
  },
  filters: {
    toUpp
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.warn-block {
  min-height: 50vh;
  display: grid;
  place-content: center;
  & h1 {
    margin-bottom: 2rem;
  }
}

</style>