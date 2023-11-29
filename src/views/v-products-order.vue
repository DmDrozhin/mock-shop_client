<template>
  <div class="v-products-order order">
    <h2 class="order__title">{{ title }}</h2>
    <ui-cancel-button
      class="order__cancel-btn"
      :size="30"
      :color="'#fa7e70'"
      :viewBox="'0 0 117 117'"
      @cancel="cancelOrder()"
    ></ui-cancel-button>

    <div class="order__body body">
        <!-- <<<<<<<<<<<<<<<<< ORDER TABLE -->
      <table class="body__table table">
        <tr class="table__head">
          <th v-for="(thd, idx) in ['№','Зображення','Найменування','Артикль','Розмір','Кількість','Сума']" :key="idx">{{ thd }}</th>
        </tr>
        <products-order-item
          class="table__body"
          v-for="(prod, idx) in ORDER"
          :key="prod.id"
          :prodData ="prod"
          :idx = "idx"
          :time="time"
        >
        </products-order-item>
        <tr class="table__footer">
          <td v-for="td in 5" :key="td.id"></td>
          <td><span class="total">{{ ORDER_QT }}</span></td>
          <td><span class="total">{{ ORDER_SUM | toAccFormat }}</span></td>
        </tr>
      </table>


      <!-- <<<<<<<<<<<<<<<<< FORM. PERSON DETAILS -->
      <div class="body__person-data person">
        <h2 class="person__title">замовник</h2>
        <div class="person__name-wrapper">
          <ui-form-input
            class="person__name1"
            :icon="'person'"
            :type="'text'"
            :placeholder="'Ім\'я'"
            :value="customer.name1"
            :required="true"
            @handleInput="customer.name1= $event"
          ></ui-form-input>
          <ui-form-input
            class="person__name2"
            :icon="'arrow_forward_ios'"
            :type="'text'"
            :placeholder="'По батькові'"
            :value="customer.name2"
            :required="false"
            @handleInput="customer.name2 = $event"
          ></ui-form-input>
          <ui-form-input
            class="person__name3"
            :icon="'arrow_forward_ios'"
            :type="'text'"
            :placeholder="'Прізвище'"
            :value="customer.name3"
            :required="false"
            @handleInput="customer.name3 = $event"
          ></ui-form-input>
        </div>
        <div class="person__contacts-wrapper">
          <ui-form-input
            class="person__phone"
            :icon="'phone'"
            :type="'text'"
            :placeholder="'Телефон'"
            :value="customer.tel"
            :required="true"
            @handleInput="customer.tel = $event"
          ></ui-form-input>
          <ui-form-input
            class="person__email"
            :icon="'alternate_email'"
            :type="'email'"
            :placeholder="'Ел.пошта'"
            :value="customer.email"
            :required="false"
            @handleInput="customer.email = $event"
          ></ui-form-input>
          <ui-form-input
            class="person__address"
            :icon="'location_pin'"
            :type="'text'"
            :placeholder="'Адреса'"
            :value="customer.address"
            :required="true"
            @handleInput="customer.address = $event"
          ></ui-form-input>
        </div>
      </div>

      <div class="footer-wrapper">
        <div>{{ time }}</div>
        <ui-order-button
          :icon="'shopping_bag'"
          :frontIcon="'double_arrow'"
          :isActive="ORDER_QT > 0"
          :color="'#329c26'"
          @handlePrompt="handleOrder()"
        > Замовити
        </ui-order-button>
        <!-- @handlePrompt="handlePrompt()" -->
      </div>

    </div>
  </div>
</template>

<script>
import productsOrderItem from '@/views/v-products-order-row.vue'
import uiFormInput from '@/components/UI/ui-form-input.vue'
import { mapGetters, mapActions } from 'vuex'

export  default {
  name: 'v-products-order',
  components: { productsOrderItem, uiFormInput },
  data () {
    return {
      title: 'Оформлення',
      customer: { 
        name1: 'Сергій', 
        name2: 'Коваль', 
        name3: '', 
        tel: '+38 (095) 585-25-55', 
        email: 's.koval@gmail.com', 
        address: 'м. Київ, вул. Вишнева, буд. 85, кв. 128' 
      },
      isSentFlag: false,
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
    ...mapGetters(['ORDER', 'ORDER_QT', 'ORDER_SUM', 'PURCHASE', 'MODAL_IF_MODE']),

    time () { return new Date().toLocaleString() },
    currentPage() {return this.$route.name},
    approve() { return this.MODAL_IF_MODE(this.msgID, false) },
    disapprove() { return this.MODAL_IF_MODE(this.msgID, true) },
  },

  watch: {
    approve (res) {
      if (res) {
        this.$store.commit('SET_LOADER', true)
        console.log('..sending purchase to server')
        const ordNum = Number((Date.now()/100).toFixed().slice(4))
        setTimeout(() => { this.SEND_ORDER_TO_SERVER(this.customer, ordNum) }, 5000)
        this.$router.push({ name: 'finally' })
      }
    },
    disapprove (res) {
      if (res) {
        this.CANCEL_ORDER()
        this.$router.push({ name: 'cart' })
      }
    }
  },

  methods: {
    ...mapActions(['CANCEL_ORDER', 'SEND_ORDER_TO_SERVER', 'SET_MODAL_WINDOW']),

    handleOrder () {
      const modal = structuredClone(this.modal)
      modal.id = this.msgID = Number((Date.now()/100).toFixed().slice(4))
      modal.title = 'замовлення'
      modal.message = `На суму: ${this.ORDER_SUM.toFixed(2)} грн.`
      modal.data = `Кількість: ${this.ORDER_QT}`
      modal.prompt = 'Відправити замовлення?'
      modal["remove-mode"] = false // as we adding prod to cart
      this.SET_MODAL_WINDOW(modal)
    },

    cancelOrder () {
      const modal = structuredClone(this.modal)
      modal.id = this.msgID = Number((Date.now()/100).toFixed().slice(4))
      modal.title = 'відміна замовлення'
      modal.message = `На суму: ${this.ORDER_SUM.toFixed(2)} грн.`
      modal.data = `Кількість: ${this.ORDER_QT}`
      modal.prompt = 'Скасувати замовлення?'
      modal["remove-mode"] = true // as we canceling the order
      this.SET_MODAL_WINDOW(modal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.v-products-order, 
.order {
  background-color: #fff;
  position: relative;
  padding: 2rem 1rem;
  @include media('max', 'sm') {
    padding: 2rem 1rem;
  }
  // &__title {}
  &__cancel-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  &__body, 
  .body {
    &__table, 
    .table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin-bottom: 2rem;
      &__head {
        line-height: 2rem;
        border-top: 1px dotted cornflowerblue;
        border-bottom: 1px dotted cornflowerblue;
        th {
          word-wrap: break-word;
          text-align: right;
          text-wrap: balance;
        }
        th:nth-child(1) {
          width: 2rem;
        }
        @include media('max', 'md') {
          th {
            font-size: .8rem;
            padding: .3rem .3rem;
            line-height: 1.2rem;
          }
          th:nth-child(1) { width: 3%; }
          th:nth-child(2) { width: 17%; }
          th:nth-child(3) { width: 20%; }
          th:nth-child(4) { width: 15%; }
          th:nth-child(5) { width: 15%; }
          th:nth-child(6) { width: 15%; }
          td:nth-child(7) { width: auto; }
        }
        @include media('max', 'sm') {
          // th {}
          th:nth-child(1) { width: 5%; }
          th:nth-child(2) { width: 20%; }
          th:nth-child(3) { width: 20%; }
          th:nth-child(4) {
            display: none;
          }
          th:nth-child(5) { width: 15%; }
          th:nth-child(6) { width: 15%; }
          td:nth-child(7) { width: auto; }

        }
      }
      // &__body {}
      &__footer {
        td {
          text-align: right;
        }
        @include media('max', 'sm') {
          td:nth-child(1) {
          }
          td:nth-child(4) {
            display: none;
          }
        }
      }
    }
    .body__person-data, 
    .person {
      // width: clamp(50%, 80rem, 90%);
      margin: 0 auto 3rem;
      padding: 1rem;
      border: 1px dotted cornflowerblue;
      border-radius: $base-radius;
      @include media('max', 'md') {
        flex-wrap: wrap;
      }
      // &__title {}
      &__name-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      &__name1 {
        flex: 1 0 auto;
      }
      &__name2 {
        flex: 1 0 auto;
      }
      &__name3 {
        flex: 1 0 auto;
      }
      &__contacts-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      &__phone {
        flex: 1 0 auto;
      }
      &__email {
        flex: 1 0 auto;
      }
      &__address {
        flex: 1 0 100%;
        // @include media('max', 'md') {}
      }
    }
  }
  




  .person-data {

    .person {

    }
  }

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>