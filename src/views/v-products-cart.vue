<template>
  <div class="v-products-cart cart">

    <h2 class="cart__title">{{ title }}</h2>

    <div class="cart__container">
      <div class="cart__items">
        <cartItem 
          v-for="(item, idx) in CART"
          :key="idx"
          :prodData="item"
          :idx="idx"
          @updateCart="updateCart($event)"
          @deleteItem="deleteItem($event)"
        ></cartItem>
      </div>

      <!-- <<<<< SUMMARY >>>>>> -->
      <div class="cart__summary summary" v-if="CART_PRODS_QT">
        <div class="summary__part1 part1">

          <ui-text-info
            class="part1__prod-qt"
            :num="CART_PRODS_QT"
            :fontSz="1.5"
            :label1="'Товарів:'"
            :room="1"
          ></ui-text-info>

          <ui-text-info
            class="part1__unit-qt"
            :num="CART_QT"
            :fontSz="1.5"
            :label1="'Кількість:'"
            :label2="'шт.'"
            :room="1.5"
          ></ui-text-info>

          <ui-price-info
            class="part1__total-sum"
            :price="CART_SUM"
            :fontSz="1.8"
            :label="'Сума замовлення:'"
            :isVertical="this.$store.state.screen < 412"
            :room="8"
          ></ui-price-info>

        </div>

        <div class="summary__part2 part2">
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
.v-products-cart, 
.cart {
  background-color: rgba($color: #fff, $alpha: 0.8);
  // &__title {}
  &__container {
    padding: 0 2rem;
    @include media('max', 'sm') {
      padding: 0 1rem;
    }
  }
  // &__items {}


  &__summary, .summary {
    border: 1px dotted $salad-fnt;
    background-color: #fff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    @include media('max', 'md') {
      // background-color: #b9efb4;
      flex-direction: column;
      padding: 2rem 1rem;
      align-items: stretch;
      gap: 3rem;
    }
    &__part1, 
    .part1 {
      flex: 1 1 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      // &__prod-qt {}
      // &__unit-qt {}
      // &__total-sum {}
      // &__ui-price-info {}
      @include media('max', 'sm') {
        // background-color: #e8efb4;
        // flex-direction: column;
        // align-items: flex-start;
        &__prod-qt { flex: 1 0 50% }
        &__unit-qt { flex: 1 }
        &__total-sum {}
        &__ui-price-info {}
      }
    }
    &__part2, 
    .part2 {
      @include media('max', 'md') {
          align-self: center;
      }
      &__order-button {
        flex: 0 0 25%;
        justify-content: flex-end;
      }
    }
  }
}

</style>