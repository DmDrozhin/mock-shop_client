<template>
  <transition name="v-notice" tag="div">
    <div class="v-warn" :style="{'border-color': current.color}" v-if="current">

        <div class="v-warn__title1 flex-wrapper">
          <i class="material-icons" :style="{'color': current.color}">{{ current.icon }}</i>
          <h2 class="">{{ current.txt1 }}</h2>
        </div>
        
        <div class="v-warn__title2">
          <h2>{{ current.txt2 }}</h2>
        </div>
        
        <div class="v-warn__link">
          <router-link :to="{ name: current.routeName }">{{ current.routeTxt }}</router-link>
        </div>

    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ui-notice-block',
  data () {
    return {
      successSent: {
        icon: 'shopping_cart_checkout',
        txt1: 'замовлення успішно відправлено. наш менеждер зв\'яжеться з вами',
        txt2: '',
        color: '#6495ed',
        routeName: 'products',
        routeTxt: 'Перейти до вибору товарів'
      },
      emptyCart: {
        icon: 'warning_amber',
        txt1: 'Не вибрані товари для замовлення',
        txt2: 'Кошик порожній',
        color: '#fa7e70',
        routeName: 'products',
        routeTxt: 'Перейти до вибору товарів'
      },
      emptyOrder: {
        icon: 'warning_amber',
        txt1: 'Не вибрані товари для оформлення',
        txt2: 'Виберіть товари!',
        color: '#fa7e70',
        routeName: 'products',
        routeTxt: 'Перейти до вибору товарів'
      },
      notFoundPage: {
        icon: 'warning_amber',
        txt1: 'Сторінка не знайдена',
        txt2: 'перевірте адресу сторінки',
        color: '#fa7e70',
        routeName: 'products',
        routeTxt: 'Перейти до вибору товарів'
      },
      canceledOrder: {
        icon: 'not_interested',
        txt1: 'Замовлення не відправлено',
        txt2: '... відміна відправки',
        color: '#fa7e70',
        routeName: 'products',
        routeTxt: 'Перейти до вибору товарів'
      }
    }
  },
  props: {
    notice: { type: String, default: '' }
  },
  computed: {
    ...mapGetters([ 'CURRENT_NOTICE' ]),

    current () {
      if (this.notice === 'successSent') {
        this.successSent.txt2 = `Номер замовлення № ${Object.values(this.CURRENT_NOTICE)[0]}`
        return this.successSent
      }
      if (this.notice === 'emptyCart') return this.emptyCart
      if (this.notice === 'emptyOrder') return this.emptyOrder
      if (this.notice === 'notFoundPage') return this.notFoundPage
      if (this.notice === 'canceledOrder') return this.canceledOrder
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.v-warn {
  width: 40vw;
  border: 5px solid;
  border-radius: $large-radius;
  padding: 5rem 8rem;
  
  &__title1 {
    max-width: fit-content;
    margin: 0 auto 1rem;
    & i {
      font-size: 3rem;
      justify-self: flex-end;
    }
    & h2 {
      font-weight: normal;
    }
  }
  &__title2 {
    max-width: fit-content;
    margin: 0 auto 2rem;
    & h2 {
      font-weight: normal;
    }
  }
  @media (max-width: 1280px) {
    padding: 4rem 5rem;
    width: 50vw;
  }
  @media (max-width: 980px) {
    padding: 4rem 5rem;
    width: 70vw;
  }
  @media (max-width: 768px) {
    width: 90vw;
    padding: 4rem 5rem;
    &__title1 {
      flex-direction: column;
      gap: 1rem;
    }
    h2 {
      font-size: 1.3rem;
    }
  }
}

.v-notice-enter {
  opacity: 0.3;
  transform: translate(250px, 0);
}
.v-notice-enter-active {
  transition: all .6s ease;
}
.v-notice-enter-to {
  opacity: 1;
  transform: translate(0);
}
</style>