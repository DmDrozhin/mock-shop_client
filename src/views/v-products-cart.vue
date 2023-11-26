<template>
  <div class="v-products-cart">
    <h2>{{ title }}</h2>

    <div class="cart-items">
      <cartItem 
        v-for="(item, idx) in CART"
        :key="idx"
        :prodData="item"
        :idx="idx"
        @updateCart="updateCart($event)"
        @deleteItem="deleteItem($event)"
      >
      </cartItem>
    </div>
    <!-- <<<<< SUMMARY >>>>>> -->
    <div class="cart-summary" v-if="CART_PRODS_QT">
      <div class="cart-summary part1">
        <div class="part1__prod-qt">
        <ui-text-info
          :num="CART_PRODS_QT"
          :fontSz="1.5"
          :label1="'Товарів'"
        ></ui-text-info>
      </div>
      <div class="part1__unit-qt">
        <ui-text-info
          class="unit-qt__ui-text-info"
          :num="CART_QT"
          :fontSz="1.5"
          :label1="'Кількість'"
          :label2="'шт.'"
        ></ui-text-info>
      </div>
      <div class="part1__total-sum">
        <ui-price-info
          class="part1__ui-price-info"
          :price="CART_SUM"
          :fontSz="1.5"
          :label="'Сума замовлення:'"
          :isVertical="false"
        ></ui-price-info>
      </div>

      </div>

      <div class="part2">
        <ui-order-button
          class="part2__order-button"        
          :icon="'shopping_bag'"
          :frontIcon="'double_arrow'"
          :isActive="CART_SUM > 0"
          :color="'#329c26'"
          @handlePrompt="processCart()"
        >Оформити
        </ui-order-button>
      </div>

    </div>

  </div>
</template>

<script>
import cartItem from '@/views/v-products-cart-item.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'v-products-cart',
  components: { cartItem },
  data () {
    return {
      title: 'Кошик',
      noticeBlock: '',
      msgID: '',
      modal: {
        // id: '',
        isBaseActive: true, // false,
        isFrozenBg: true,
        isModalActive: true,
        result: undefined,
        // title: '',
        // message: '',
        // data: '',
        // prompt: '',
        page: this.currentPage,
        // 'remove-mode': ''
      },
      removable: {}
    }
  },
  computed: {
    ...mapGetters(['CART', 'CART_PRODS_QT', 'CART_SUM', 'CART_QT', 'MODAL_IF_MODE']),
    currentPage() {return this.$route.name},
    approve() { return this.MODAL_IF_MODE(this.msgID, false) },
    disapprove() { return this.MODAL_IF_MODE(this.msgID, true) },
  },

  watch: {
    approve (res) {
      if (res) {        
        this.MOVE_CART_TO_ORDER()
        this.$router.push({name: 'order'})
      }
    },
    disapprove (res) {
      if (res) {
        if (this.CART_PRODS_QT > 1) this.DELETE_FROM_CART(this.removable.cartId)
        else {
          this.DELETE_FROM_CART(this.removable.cartId)
          this.$router.push({ name: 'products' })
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'DELETE_FROM_CART', 'UPDATE_CART', 'MOVE_CART_TO_ORDER', 'SET_MODAL_WINDOW']),

    processCart () {
      const modal = structuredClone(this.modal)
      modal.id = this.msgID = Number((Date.now()/100).toFixed().slice(4))
      modal.title = 'замовлення'
      modal.message = `На суму: ${this.CART_SUM.toFixed(2)} грн.`
      modal.data = `Кількість: ${this.CART_QT}`
      modal.prompt = 'Перейти до оформлення?'
      modal["remove-mode"] = false // as we adding prod to cart
      this.SET_MODAL_WINDOW(modal)
    },

    updateCart(prod) { this.UPDATE_CART(prod) },

    deleteItem (prod) {
      this.removable = prod
      const modal = structuredClone(this.modal)
      modal.id = this.msgID = Number((Date.now()/100).toFixed().slice(4))
      modal.title = prod["prod-name"]
      modal.message = `Розмір: ${prod.prodSize}`
      modal.data = `Код товару: ${prod.article}`
      modal.prompt = 'Видалити з кошику?'
      modal["remove-mode"] = true // as we canceling the order
      this.SET_MODAL_WINDOW(modal)
    }
  }
}
</script>




<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-products-cart {
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  padding-bottom: 2rem;
  & h1 {
    margin: 0 0 2rem 0;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  .notice-block {
    min-height: 50vh;
    display: grid;
    place-content: center;
  }
  .cart-summary {
    max-width: 80vw;
    margin: 0 auto;
    border: 1px dotted $salad-fnt;
    background-color: #fff;
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    &__part1-wrapper, 
    .part1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      gap: 1rem;
      &__prod-qt {
        flex: 1 1 30%;
      }
      &__unit-qt {
        flex: 1 1 30%;
      }
      &__total-sum {
        flex: 1 1 40%;
      }
      // &__ui-price-info {

      // }

    }
    .part2 {
      &__order-button {
        flex: 0 1 25%;
        justify-content: flex-end;
        // background-color: #ccacac;
      }
    }

    @media (max-width: 1280px) {
    max-width: 90vw;
      h2 {
        font-size: 1rem;
      }
    }
    @media (max-width: 980px) {
      padding: 0.5rem 1rem;
      max-width: 95vw;
    }
    @media (max-width: 768px) {
      padding: 0.5rem 0.5rem;
      h1 {
        font-size: .7rem;
      }
      flex-wrap: wrap;
      &__prod-qt {
        flex: 1 0 25%;
        text-align: left;
      }
      &__unit-qt {
        flex: 1 0 25%;
        text-align: center;
      }
      &__total-sum {
        flex: 1 0 40%;
        text-align: right;
      }
      &__button {
        flex: 1 0 100%;
        .button {
          justify-content: center;
        }
      }
    }
    @media (max-width: 580px) {
      padding: 0.5rem 0.5rem;
      flex-wrap: wrap;
      gap: 0;
      // &__prod-qt {
      // }
      // &__unit-qt {
      // }
      // &__total-sum {
      // }
      &__button {
        margin-top: 1.5rem;
        padding: 1.5rem 0;
        border-top: 1px dotted grey;
      }
    }
  }
}

</style>