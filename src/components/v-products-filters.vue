<template>
  <div class="head-filters">
    <div class="head-filters__title">
      {{ title | toUpperCase }}
    </div>
    <ui-custom-select
      class="head-filters__size-filter"
      :options="sizes"
      :optionValue="size"
      @on-select="handleSizeFilter($event)"
    ></ui-custom-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'v-product-filters',

  data() {
    return {
      title: 'display options:',
      size: 'all'
    }
  },
  watch: {
  },

  computed: {
    ...mapGetters({
      sizes: 'PRODUCTS_SIZE_LIST',
    })
  },

  methods: {
    ...mapActions(['SET_SELECTED_SIZE']),

    handleSizeFilter(e) {
      this.size = e
      this.SET_SELECTED_SIZE(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/styles.scss';
  .head-filters {
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
    &__title {
      align-self: flex-end;
    }
    &__size-filter {
      // flex-basis: 70px;
      width: 75px;
    }
    &__size-filter.select::before {
      top: -25px;
      left: 8px;
      content: 'by size';
      text-transform: uppercase;
      color: #000;
      font-weight: 600;
      letter-spacing: 1.1px;
      text-shadow: 1px 1px 1px #fff;
    }
  }

</style>
