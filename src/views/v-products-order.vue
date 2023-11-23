<template>
  <div class="v-products-order">
    <h2>{{ title }}</h2>

    <div class="order-wrapper order">
      <div class="order">
        <div class="order__cancel" @click="cancelOrder()">
          <i class="material-icons">cancel</i>
        </div>
        <!-- <<<<<<<<<<<<<<<<< ORDER TABLE -->
        <div class="order__table">
          <table class="order__order-table">
            <tr>
              <th v-for="th in ['№', 'Зображення', 'Найменування', 'Артикль',   'Розмір', 'Кількість', 'Сума']" :key="th.id">{{ th }}</th>
            </tr>
            <products-order-item
              v-for="(prod, idx) in ORDER"
              :key="prod.id"
              :prodData ="prod"
              :idx = "idx"
              :time="time"
            >
            </products-order-item>
            <tr>
              <td v-for="td in 5" :key="td.id"></td>
              <td><span class="total">{{ ORDER_QT }}</span></td>
              <td><span class="total">{{ ORDER_SUM | toAccFormat }}</span></td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <<<<<<<<<<<<<<<<< FORM. PERSON DETAILS -->
      <div class="person-data">
        <div class="person person-data__person">
          <h2 class="person__title">введіть свої дані</h2>
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
      // name: 'Ім\'я <i class="material-icons">person</i>',
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

.v-products-order {
  background-color: #fff;
  padding: 2rem 10rem;
  & h1 {
    margin-bottom: 2rem;
  }
  @media (max-width: 1280px) {
    padding: 1rem 2rem;
  }
  
  @media (max-width: 980px) {
    padding: 1rem 0;
  }
  @media (max-width: 768px) {
    padding: 1rem 0;
    h1 {
      font-size: 1.5rem;
    }
  }
  
  .notice-block {
    min-height: 50vh;
    display: grid;
    place-content: center;
  }
  .order-wrapper {
    .order {
      margin: 0 auto 5rem;
      &__cancel {
        display: flex;
        justify-content: flex-end;
        position: relative;
        i {
          margin: -1rem 0 1rem 0;
          cursor: pointer;
          color: $warn-txt;
        }
      }
      &__cancel:hover::before {
        content: "Видалити всі товари";
        position: absolute;
        display: block;
        top: -40px;
        right: 0;
        color: $warn-txt;
      }
      &__table {
        .order__order-table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          @media (max-width: 768px) {
            width: 100%;
          }
          tr {
            line-height: 2rem;
            border-top: 1px dotted cornflowerblue;
            border-bottom: 1px dotted cornflowerblue;
            @media (max-width: 768px) {
              th {
                font-size: .8rem;
                word-wrap: break-word;
                padding: .3rem .3rem;
                line-height: 1.2rem;
              }
              th:nth-child(1) {
                background: rgba(#000000, $alpha: .2);
                width: 2.5rem;
              }
              th:nth-child(4) {
                width: 3rem;
              }
              th:nth-child(5) {
                width: 3rem;
              }
              td:nth-child(1) {
                background: rgba(#000000, $alpha: .2);
              }
            }
            td {
              text-align: center;
              font-size: 1.2rem;
              font-weight: 600;
              &:last-child {
                text-align: right;
                padding: 0 1rem 0 0;
              }
            }

          }
        }
      }
    }
  }


  .person-data {
    // width: clamp(50%, 80rem, 90%);
    margin: 0 auto 3rem;
    padding: 1rem;
    border: 1px dotted cornflowerblue;
    border-radius: $base-radius;
    .person {
      &__title {
        margin-bottom: 1rem;
      }
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
        flex: 1 0 auto;
        @media (min-width: 768px) {
          flex: 1 0 100%;
        }
      }
      @media (max-width: 768px) {
        flex-wrap: wrap;
      }
    }
  }

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>