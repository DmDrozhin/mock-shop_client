<template>
  <!-- <div class="v-products-order-item"> -->
    <tr class="v-products-order-item order-item">
      <td>{{ idx + 1 }}</td>
      <td><img :src="require('../assets/images/' + prodData.image)" alt="Product image"></td>
      <td>{{ prodData["prod-name"] }}</td>
      <td>{{ prodData.article }}</td>
      <td>{{ prodData.prodSize | toUpperCase }}</td>
      <td class="order-item__sub-total">{{ prodData.cartQt }}
        <span class="tech-info-gray order-item__tech-info"></span>
      </td>
      <td>{{ prodData.cartSum | toAccFormat }}</td>
    </tr>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-products-order-item',
  data () {
    return {
      inStockQt: 0
    }
  },
  props: {
    prodData: { type: Object, default: () => {} },
    idx: { type: Number, default: 0 },
    time: { type: Date | String, default: () => new Date().toLocaleString() }
  },

  computed: {
    ...mapGetters(['PRODUCTS']),
    // inStockProducts () {
    //   return this.PRODUCTS[this.prodData.prodID].available[this.prodData.prodSizeID][this.prodData.prodSize]
    // }
  },
  beforeMount () {
    this.$set(this.prodData, 'time', this.time)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/styles.scss';
  .order-item {    
    border-bottom: 1px dotted cornflowerblue;
    & td {
      text-align: right;
      &:last-child {
        text-align: right;
      }
    }
    @include media('max', 'sm') {
      td:nth-child(1) {
      }
      td:nth-child(4) {
        display: none;
        background: rgba(#9b3a3a, $alpha: .2);
      }
    }

    & img {
      height: 5rem;
      width: auto;
      margin: .3rem 0;
    }
    &__tech-info {
      @media (max-width: 768px) {
        display: block;
      }
    }
  }
</style>