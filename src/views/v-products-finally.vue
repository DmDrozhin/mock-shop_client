<template>
  <div class="v-products-finally finally">

    <div class="finally__container">
      <div class="finally__wrapper">

        <div class="finally__header header">
          <h2 class="header__txt">{{ title }}</h2>
          <div class="header__time"><h4>{{ time }}</h4></div>
        </div>

        <div class="finally__main main">
          <div class="main__message">
            <p>Замовлення - або відправлено - resp.status === 201, або не відправлено</p>
            <p>Надалі повертаємось до вибору товарів або пропонуємо upsales</p>
          </div>
          <div class="main__server-resp resp">
            <h3 class="resp__title">Поточна відповідь відправки:</h3>
            <br>
            <h3 class="resp__content" v-if="GET_SERVER_RESP">{{ GET_SERVER_RESP }}</h3>
          </div>
        </div>

        <div class="finally__footer footer">
          <h3 class="footer__title">Some footer part</h3>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export  default {
  name: 'v-products-finally',
  
  data () {
    return {
      title: 'Фінішна сторінка',
    }
  },
  computed: {
    ...mapGetters(['GET_SERVER_RESP']),
    time () { return new Date().toLocaleString() },
    currentPage() {return this.$route.name},
    parentHeight() {return this.$parent.$el.offsetHeight }

  },

  watch: {},

  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.v-products-finally,
.finally {
  background-color: #ffffff;

  &__container {
    height: 100%;
    padding: 0 2rem;
    @include media('max', 'sm') {
      padding: 0 1rem;
    }
  }
  &__wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__header, 
  .header {
    // background-color: #a9e7a5;
    &__title {
      margin-bottom: 2rem;
    }
    &__time {
      text-align: left;
      margin-bottom: 4rem;
    }
  }

  &__main, 
  .main {
    flex: 1;
    // background-color: #ccc;
    &__message {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 4rem;
    }
    &__server-resp, .resp {
      padding: 1rem 2rem;
      border: 1px solid rgb(78, 78, 78);
      // &__title {}
      &__content {
        color: cornflowerblue;
        text-decoration: wavy;
      }
    }
  }


  &__footer, 
  .footer {
    // background-color: #66a3e8;
    &__title {
      margin-bottom: 2rem;
    }
  }
}

</style>