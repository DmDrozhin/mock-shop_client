<template>
  <div class="v-products-archive gallery">

    <div class="gallery__filters">
      <productFilers></productFilers>
    </div>
    
    <h2 class="gallery__title">{{ title }}</h2>
    <main class="gallery__window">
      <prodsArchItem 
        v-for="prod in PRODUCTS_FILTERED_ARR"
        :key="prod.id" 
        :product="prod"
        @sendToCart="sendToCart($event)">
      </prodsArchItem>
    </main>
  </div>
</template>

<script>
import prodsArchItem from '@/views/v-products-archive-item.vue'
import productFilers from '@/components/v-products-filters.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { prodsArchItem, productFilers },
  name: 'v-products-archive',
  data () {
    return {
      title: 'Gallery of products',
      chosenProd: {},
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
      }
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS_FILTERED_ARR', 'MODAL_IF_MODE']),
    currentPage() {return this.$route.name},
    approve() { return this.MODAL_IF_MODE(this.msgID, false) },
  },
  watch: {
    approve(res) {
      if (res) {
        this.ADD_TO_CART(this.chosenProd)
        this.$router.push({name: 'cart'})
      }
    },
  },

  methods: {
    ...mapActions(['ADD_TO_CART', 'ADD_CURRENT_NOTICE', 'SET_MODAL_WINDOW']),

    sendToCart(prod) {
      this.chosenProd = prod
      const modal = structuredClone(this.modal)
      modal.id = this.msgID = Number((Date.now()/100).toFixed().slice(4))
      modal.title = prod["prod-name"]
      modal.message = `Розмір: ${prod.prodSize}`
      modal.data = `Код товару: ${prod.article}`
      modal.prompt = 'Додати товар до кошику?'
      modal["remove-mode"] = false // as we adding prod to cart
      this.SET_MODAL_WINDOW(modal)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/styles.scss';
.v-products-archive,
.gallery {
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  // padding: 1rem 1rem 2rem 1rem;
  position: relative;
  &__title {
    @include media('max', 'lg') {
      margin-top: 4rem;
    }
    // @include media('max', 'md') {}
  }
  &__filters {
    position: absolute;
    background-color: #fff;
    right: 1rem;
    top: -1rem;
    padding: 0.4rem 1rem;
    // .head-filters {}
    @include media('max', 'lg') {
      top: 0;
      left: 0;
      right: 0;
    }
  }
  &__window {
    display: grid;
    place-content: center;
    grid-template-columns: repeat(auto-fit, minmax(280px, 350px));
    grid-auto-flow: row;
    grid-auto-columns: minmax(280px, 350px);
    grid-gap: 1rem;
  }
}
</style>
