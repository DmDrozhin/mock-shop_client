<template>
  <div class="v-product-archive-item prod-card">
<!-- <<<<<<<<<<<<< SIDE 1 >>>>>>>>>>>>>>>> -->

    <div class="prod-card__side1">
      <!--*** HEADER ***-->
      <div class="prod-card__side1 title-block-wrapper title-block">
        <!-- temp tech info -->
        <div class="title-block__tech-info">
          {{ instockQt }}/{{ isInCart }}/{{ isInStock }}
        </div>
        <h3 class="title-block__title">{{ product["prod-name"] }}</h3>
        <ui-ratings-block 
          class="title-block__ui-rates"
          :prod-rate="product.rating"
        ></ui-ratings-block>
      </div>
      <div class="prod-img-wrapper prod-img">
        <img 
          class="prod-img__image"
          :src="require('../assets/images/' + product.image)" alt="Product-image"
        >
      </div>
    </div>
<!-- <<<<<<<<<<<<< SIDE 2 >>>>>>>>>>>>>>>> -->
    <div class="prod-card__side2">

      <!--*** STOCK INFO ***-->
      <div class="stock-info">
        <div class="stock-info__ui-sign--wrapper">
          <ui-instock-sign
            class="stock-info__ui-sign"
            :status="product.instock"
            :label="instockLabel"
            :iconSize="34"
          ></ui-instock-sign>
        </div>

          <ui-instock-block
            class="stock-info__ui-instock"
            :available="product.available"
          ></ui-instock-block>
      </div>

      <!--*** SELECTORS ***-->
      <!--*** Size selector ***-->
      <div class="selectors">
        <div class="selectors__size-selector">
          <ui-custom-select
            class="product-filters__ui-filter"
            :options="sizePickerData"
            :optionValue="currentSize"
            @on-select="changeSize($event)"
          ></ui-custom-select>
        </div>
      </div>
      <!--*** PROD DETAILS *** -->
      <div class="info-details-wrapper">
        <div class="info-details">
          <ui-text-info
            class="info-details__instock"
            :label1="'наявність:'"
            :label2="undefined"
            :num="instockQt"
            :fontSz="1.2"
            :room="0.5"
          ></ui-text-info>
          <ui-text-info
            class="info-details__gender"
            :label1="product.category"
            :label2="undefined"
            :num="undefined"
            :fontSz="0.8"
            :room="1"
          ></ui-text-info>
          <ui-text-info
            class="info-details__article"
            :label1="'артикль:'"
            :label2="undefined"
            :num="product.article"
            :fontSz="1.2"
            :room="1"
          ></ui-text-info>
        </div>
      </div>
      
      <div class="info-price">
        <!--*** PRICES BLOCK *** -->
        <ui-price-info
          class="info-price__price"
          :price="product.price"
          :fontSz="2"
          :isVertical="true"
          :room="8"
        ></ui-price-info>
      </div>
      <!--*** BUTTON BLOCK ***-->
      <ui-prod-button
          class="price__ui-button"
          :isInStock="isInStock"
          :isInCart="isInCart"
          @handleClick="handleBtn()"
      >
      </ui-prod-button>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uiPriceInfo from '@/components/UI/ui-price-info.vue'
import uiTextInfo from '@/components/UI/ui-text-info.vue'
import uiInstockSign from '../components/UI/ui-instock-sign.vue'

export default {
  components: { uiPriceInfo, uiTextInfo, uiInstockSign },
  name: 'v-product-archive-item',
  data () {
    return {
      currentSize: '-',
      prodSum: 0,
      instockLabel: 'на складі'
    }
  },
  
  props: {
    product: { type: Object, default: () => {} },
  },

  watch: {
    PRODUCTS_SELECTED_SIZE(sz) {
      // console.log(sz)
      sz !== 'all' ? this.currentSize = sz : this.currentSize
    }
  },

  computed: {
    ...mapGetters([
      'CART', 'PRODUCTS_SIZE_LIST', 'PRODUCTS_SELECTED_SIZE']),
    
    // the array kind of [ { sz: 's', qt: 5}, { sz: 'l', qt: 0} ]
    instockArr() {
      let arr = []
      this.product.available.forEach(el => {
        const intEl = Object.entries(el)[0]
        arr.push({sz: intEl[0], qt: intEl[1]})
      })
      return arr
    },
    // returns quantity of prod. of currently picked size
    instockQt () {
      if (this.currentSize === '-') return ''
      else return this.instockArr.find(el => el.sz === this.currentSize).qt
    },

    // returns array of only in stock sizes for size picker
    sizePickerData() {
        let arr = []
        this.instockArr.forEach(el => { if (el.qt > 0) arr.push(el.sz) })
        return arr
    },
    sizePickerDataFiltered() {
      if (this.PRODUCTS_SELECTED_SIZE === 'all') return this.sizePickerData
      else return this.sizePickerData.filter(el => el === this.PRODUCTS_SELECTED_SIZE)
    },
    isInCart () {
      return this.CART.some(it => it.article === this.product.article && it.prodSize === this.currentSize)
    },
    isInStock () {
      return (this.instockQt > 0) ? true : false
    }
  },

  // METHODS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  methods: {
    // handler for ui-custom-number-picker
    changeSize (sz) {
      this.currentSize = sz
    },
    handleBtn () {
      this.sendProdToCart()
    },
    sendProdToCart () {
      if (!this.isInCart) {
        const prodCopy = structuredClone(this.product)
        prodCopy.prodSize = this.currentSize
        prodCopy.prodQt = 1 // probably is unneeded
        prodCopy.cartQt = 1 // probably is unneeded
        prodCopy.cartSum = this.product.price // probably is unneeded
        prodCopy.cartId = Math.floor((1 + Math.random()) * 0x10000)
        this.$emit('sendToCart', prodCopy)
      }
    }
  },
  mounted () {
    this.prodSum = this.product.price
  }
}
</script>

************************** STYLES ***************************
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.prod-card {
  cursor: default;
  height: 35rem;
  box-shadow: $main-shadow;
  background-color: rgba($color: #ffffff, $alpha: 0.9);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &__side1 {
    // background-color: #b7f6d4;
    min-height: 100%;
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    &.title-block-wrapper,
    .title-block {
      position: relative;
      flex-basis: 20%;
      gap: 0;
      &__tech-info {
        position: absolute;
        top: -15px;
        left: 0;
        font-size: 0.8rem;
        color: #505050;
        z-index: 1;
      }
      // &__title {
      // }
      // &__ui-rates {
      // }
    }
    &.prod-image-wrapper,
    .prod-img {
      position: relative;
      flex-grow: 1;
      min-width: 100%;     
      
      &__image {
        // border: 0.5px solid rgb(33, 51, 6);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        // z-index: 0;
      }
    }
  }
  // <<<<<<<<<<< SIDE 2 >>>>>>>>>>
  &__side2 {
    // background-color: #f5e7e7;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.5rem;
    .stock-info {
      @include prod-card-side2-block;
      flex: 0 0 10rem;
      gap: 0.5rem;
      &__ui-sign--wrapper {
        min-height: 2.5rem;
        min-width: 8.5rem;
      }
      // .stock-info__ui-sign {
      // }
      &__ui-instock {
        z-index: 0;
        height: 4rem;
      }
    }
    .selectors {
      // background-color: #bbb;
      @include prod-card-side2-block;
      min-height: 100%;
      flex: 1 0 3rem;
      gap: 0rem;
      &__size-selector {
        // position: relative;
        height: 35px;
        width: 70px;
        // &.select-box {
        //   padding: 0.1rem 0.8rem;
        // }
      }
    }
    .info-details-wrapper{
      flex: 1 0 auto;
      .info-details {
        // background-color: #9fa9c5;
        // border-right: 1px solid $salad-fnt;
        @include prod-card-side2-block;
        align-items: flex-start;
        flex: 0 0 5rem;
        gap: 0.6rem;
        // &__gender {
        //   // background-color: #ebb5b5;
        // }
        // &__article {
        //   // background-color: #c4f1ea;
        // }
      }
    }

    .info-price {
      // background-color: #9fa9c5;
      // border-right: 1px solid $salad-fnt;
      @include prod-card-side2-block;
      align-items: flex-start;
      flex: 0 0 6rem;
      gap: 0.4rem;
      padding-left: 0.7rem;
      // &__price {

      // }
      // &__sum {
      //   // background-color: rgb(185, 155, 224);
      // }
    }
    .price__ui-button {
      width: 8.5rem;
      // z-index: 1;
    }
  }
}
</style>