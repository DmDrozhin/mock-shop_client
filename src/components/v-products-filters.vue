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
      title: 'display:',
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
      font-weight: 600;
      letter-spacing: 1.2px;
    }
    &__size-filter {
      // flex-basis: 70px;
      width: 75px;
      position: relative;
    }
    &__size-filter.select::before {
      content: 'by size';
      position: absolute;
      display: block;
      width: 75px;
      height: 30px;
      top: -40px;
      left: 0px;

      // text-transform: uppercase;
      text-transform: capitalize;
      text-align: center;
      color: #000;
      font-weight: 600;
      letter-spacing: 1.1px;
      line-height: 30px;
      background-color: #fff;
      
    }
  }

</style>
