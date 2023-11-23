<template>
  <div class="v-products-cart-item">
    <div class="item">
      <p class="item__prod-id">{{ idx + 1 }}</p>
      <h3 class="item__prod-name">{{ prodData["prod-name"] }}</h3>
      <div class="item__img-wrapper item-img">
        <div 
          class="item-img__image"
          :style="backGroundImage"
        >
        </div>
      </div>

      <div class="item__prod-info prod-info">
        <div>{{ prodData.category }}</div>
        <ui-text-info
          class="prod-info__article"
          :num="prodData.article"
          :fontSz="1"
          :label1="'Артикль:'"
        ></ui-text-info>
        <ui-price-info
          class="prod-info__price"
          :price="prodData.price"
          :fontSz="1"
          :label="'Ціна'"
        ></ui-price-info>
        <ui-text-info
          class="prod-info__stock"
          :num="instockQt"
          :fontSz="1"
          :label1="'В наявності'"
          :label2="'од.'"
        ></ui-text-info>

        <div class="tech-info">ID: {{ prodData.id }}</div>
        <div class="tech-info">Qt: {{ prodData.prodQt }}/ {{ cartQt }}</div>
      </div>

      <div class="item__size flex-wrapper">
        <ui-text-info
          class="prod-info__stock"
          :num="prodData.prodSize.toUpperCase()"
          :fontSz="1.2"
          :label1="'Розмір:'"
        ></ui-text-info>
      </div>

      <!--************************** QT *****************************-->
      <div class="item__qt-selector">
        <ui-count-picker
          :value="cartQt"
          :maxValue="instockQt"
          :minValue="1"
          :label="'Кількість:'"
          @clicked="updateQt($event)"
        ></ui-count-picker>
      </div>
      <!--************************** SUM *****************************-->
      <div class="item__sum-block">
        <ui-price-info
          :price="cartSum"
          :fontSz="1.5"
          :label="'Сума'"
        ></ui-price-info>
      </div>
       <!--************************ DELETE ****************************-->
      <div class="item__del-btn">
        <ui-delete-button 
          @deleteItem="deleteItem"
        ></ui-delete-button>
      </div>


    </div>
  </div>
</template>

<script>
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
    cartSum() {
      return this.cartQt * this.prodData.price
    },
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
    }
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

.v-products-cart-item {
  max-width: 80vw;
  margin: 0 auto;
  @media (max-width: 1280px) {
    max-width: 90vw;
    h2 {
      font-size: 1rem;
    }
  }
  @media (max-width: 980px) {
    max-width: 95vw;
  }
  @media (max-width: 768px) {
    max-width: 100;
    h1 {
      font-size: .7rem;
    }
  }
  .item {
    display: grid;
    place-items: center;
    grid-template-columns: auto 1fr auto 1fr 1fr 1fr 1fr auto;
    column-gap: .5rem;
    row-gap: .5rem;
    border: 1px dotted $salad-fnt;
    border-bottom: none;
    padding: 0.5rem 2rem;
    background-color: #fff;
    
    &__img-wrapper, .item-img {
      height: 150px;
      width: 130px;
      
      &__image {
        height: 100%;
        background-size: contain; /* or 'contain' */
        background-position: center;
        background-repeat: no-repeat;
      }
    }
    &__prod-info, .prod-info{
      height: 100%;
      // background-color: #d5b5b5;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      // &__article {}
      &__price {
        flex-direction: row;
        gap: 0.4rem;
      }
      // &__stock {}
    }
    // &__size {}
    // &__qr-selector {}
    &__sum-block {
      .ui-price-info {
        min-width: 7rem;
      }
    }
    // &__del-btn {}

    @media (max-width: 1280px) {

    }
    @media (max-width: 980px) {
      padding: 0.5rem 1rem;
      &__size {
        flex-direction: column;
      }

      // &__qt-selector {}
      // &__selector {}
      // &__sum-block {}
      // &__del-btn {}
    }
    @media (max-width: 768px) {
      padding: 0.5rem;
      grid-template-columns: repeat(5, auto);
      &__prod-id {
        grid-row: 1 / span 2;
      }
      &__qt-control {
        grid-column: 2 / -1;
        justify-content: space-evenly;
        border: 1px solid rgb(222, 222, 222);
        justify-self: stretch;
      }
    }
  }
}
</style>