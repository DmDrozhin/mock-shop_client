<template>
  <div class="v-products-cart-item item">

    <ui-cancel-button
      class="item__cancel-btn"
      :size="30"
      :color="'#d86f6f'"  
      :viewBox="'0 0 32 32'"
      @cancel="deleteItem()"
    ></ui-cancel-button>
    <div class="item__tech-data">
      <div class="tech-info">ID: {{ prodData.id }}</div>
      <div class="tech-info">Qt: {{ prodData.prodQt }}/ {{ cartQt }}</div>
    </div>
    
    <!-- MAIN BLOCKS -->
    <!-- DIVIDER-1 -->
    <div class="item__divider1">
      <div class="flex-wrapper">
        <span class="item__prod-id">{{ idx + 1 }}.</span>
        <h3 class="item__prod-name">{{ prodData["prod-name"] }}</h3>
      </div>

      <div class="item__image" :style="backGroundImage"></div>
    </div>
    <!-- DIVIDER-2 -->
    <div class="item__divider2">
      <div class="item__prod-info data">
        <div class="data__gender">{{ prodData.category }}</div>
        <ui-text-info
          class="data__article"
          :num="prodData.article"
          :fontSz="1"
          :label1="'Артикль:'"
          :isVertical="false"
          :room="1"
        ></ui-text-info>
        <ui-price-info
          class="data__price"
          :price="prodData.price"
          :fontSz="1"
          :label="'Ціна:'"
          :isVertical="false"
          :room="4"
        ></ui-price-info>
        <ui-text-info
          class="data__stock"
          :num="instockQt"
          :fontSz="1"
          :label1="'В наявності:'"
          :label2="'од.'"
          :isVertical="false"
          :room="1"
        ></ui-text-info>
        <ui-text-info
          class="data__size"
          :num="prodData.prodSize.toUpperCase()"
          :fontSz="1.2"
          :label1="'Розмір:'"
          :isVertical="false"
          :room="1"
        ></ui-text-info>
      </div>
      <!-- SUM -->
      <ui-price-info
        class="item__sum-block"
        :price="cartSum"
        :fontSz="1.5"
        :label="'Сума:'"
        :isVertical="this.$store.state.screen <= 910"
        :room="7"
      ></ui-price-info>
    </div>
    <!-- DIVIDER-3 -->
    <div class="item__divider3">
      <!-- QT -->
      <ui-count-picker
        class="item__qt-selector"
        :value="cartQt"
        :maxValue="instockQt"
        :minValue="1"
        :label="'Кількість:'"
        @clicked="updateQt($event)"
      ></ui-count-picker>
    </div>
    <!-- DIVIDER-4 -->
    <!-- <div class="item__divider4">
    </div> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-products-cart-item',
  data () {
    return {
      cartQt: 0,
    }
  },
  props: {
    prodData: { type: Object, default: () => {} },
    idx: { type: Number, default: 0 }
  },
  computed: {
    ...mapGetters(['SCREEN']),
    cartSum() { return this.cartQt * this.prodData.price },
    backGroundImage() {
      return {'background-image': 'url(' + require('@/assets/images/' + this.prodData.image) + ')'}
    },
    // the array kind of [ { sz: 's', qt: 5}, { sz: 'l', qt: 0} ]
    instockArr() {
      let arr = []
      this.prodData.available.forEach(el => {
        const intEl = Object.entries(el)[0]
        arr.push({sz: intEl[0], qt: intEl[1]})
      })
      return arr
    },
    // returns quantity of prod. of currently picked size
    instockQt () {
      return this.instockArr.find(el => el.sz === this.prodData.prodSize).qt
    },
    isInStock () {
      return (this.instockQt > 0) ? true : false
    },
    // isRotateInfo() { return this.SCREEN !== 'xl' ? true : false },
  },

  watch: {},

  methods: {
    deleteItem () {
      this.$emit('deleteItem', this.prodData)
    },
    updateQt (qt) {
      this.cartQt = this.cartQt + qt
      this.updateCart()
    },
    updateCart () {
      const prodCopy = JSON.parse(JSON.stringify(this.prodData))
      prodCopy.cartQt = this.cartQt
      prodCopy.cartSum = this.cartSum
      this.$emit('updateCart', prodCopy)
    }

  },

  mounted () {
    this.cartQt = this.prodData.cartQt
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-products-cart-item,
.item {
  border: 1px dotted $salad-fnt;
  border-bottom: none;
  padding: 0.5rem 2rem;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  // align-items: center;
  flex-wrap: wrap;
  @include media('max', 'md') {
    align-items: stretch;
  }
  @include media('max', 'sm') {
    padding: 0.5rem 0.5rem;
  }
  &__cancel-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  &__tech-data {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }

  // DIVIDER-1
  &__divider1 {
    @include cart-item-divider;
    @include media('max', 'md') {
      flex-direction: column;
      align-items: center;
    }
  }
  &__prod-id {}
  &__prod-name {
    @include media('max', 'lg') {

    }
  }
  &__image {
    $img-height: 150px;
    height: $img-height;
    width: calc($img-height / 2);
    // width: 130px;
    background-size: contain; /* or 'contain' */
    background-position: center;
    background-repeat: no-repeat;
    @include media('max', 'lg') {
      $img-height: 200px;
      height: $img-height;
      width: calc($img-height / 2);
    }
    @include media('max', 'md') {
      $img-height: 300px;
      height: $img-height;
      width: calc($img-height / 2);
    }
  }

  // DIVIDER-2
  &__divider2 {
    @include cart-item-divider;
    @media (max-width: 910px) {
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  &__prod-info, 
  .data {
    align-self: stretch;
    // background-color: #d5b5b5;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    min-width: fit-content;
    flex: 1 1 auto;
    // &__gender {}
    // &__article {}
    // &__price {
    //   max-width: none;
    // }
    // &__stock {}
    // &__size {}
  }
  &__sum-block {
    border: 1px solid $green-btn;
    border-radius: $base-radius;
    justify-content: center;
    min-width: 6rem;
    padding: 0.5rem;
    align-self: center;
    align-self: center;
    flex: 1 0 auto;
    @include media('max', 'md') {
      align-self: flex-start;
      // align-items: center;
    }
    .ui-price-info__num-inline {
      width: 6rem;
      background-color: #891d1d;
    }
    // .ui-price-info {
    //   min-width: 7rem;
    //   border: 1px solid $green-btn;
    //   border-radius: $base-radius;
    //   // background-color: #d5b5b5;
    // }
  }
  // DIVIDER-3
  &__divider3 {    
    @include cart-item-divider;
  }
  // &__qr-selector {}

  // DIVIDER-4
  // &__divider4 {
  //   @include cart-item-divider;
  // }

  @include media('max', 'lg') {}
  @include media('max', 'md') {}
  
}
</style>